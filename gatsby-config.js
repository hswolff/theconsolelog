const path = require('path');
const { DateTime } = require('luxon');

module.exports = {
  siteMetadata: {
    title: 'The Console Log',
    description:
      'A weekly podcast about all the latest JavaScript and web news.',
    siteUrl: 'http://theconsolelog.com',
    iTunesLogo: 'https://theconsolelog.com/itunes-logo.jpeg',
    keywords: 'podcast, javascript, news',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js',
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-107877562-1',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'episodes',
        path: path.join(__dirname, 'episodes'),
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
              iTunesLogo
            }
          }
        }
      `,
        setup: ({
          query: {
            site: { siteMetadata },
            ...rest
          },
        }) => {
          return {
            ...siteMetadata,
            ...rest,
            image_url: siteMetadata.iTunesLogo,
            language: 'en',
            custom_namespaces: {
              itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
            },
            custom_elements: [
              { 'itunes:subtitle': siteMetadata.description },
              { 'itunes:author': 'The Console Log' },
              {
                'itunes:summary': siteMetadata.description,
              },
              {
                'itunes:owner': [
                  { 'itunes:name': 'The Console Log' },
                  { 'itunes:email': 'hello@hswolff.com' },
                ],
              },
              { 'itunes:explicit': 'no' },
              {
                'itunes:image': {
                  _attr: {
                    href: siteMetadata.iTunesLogo,
                  },
                },
              },
              {
                'itunes:category': [
                  {
                    _attr: {
                      text: 'Technology',
                    },
                  },
                  {
                    'itunes:category': {
                      _attr: {
                        text: 'Tech News',
                      },
                    },
                  },
                ],
              },
            ],
          };
        },
        feeds: [
          {
            query: `
            {
              allEpisodesJson(sort: {fields: [date___end], order: DESC}) {
                edges {
                  node {
                    title
                    fields {
                      episodeNumber
                      slug
                    }
                    youtube {
                      id
                    }
                    duration
                    content {
                      name
                      links
                    }
                    date {
                      start
                      end
                    }
                  }
                }
              }
            }
          `,
            serialize: ({
              query: {
                site: { siteMetadata },
                allEpisodesJson,
              },
            }) => {
              return allEpisodesJson.edges.map(({ node }) => {
                return Object.assign({}, node, {
                  description: createDescription(node),
                  url: siteMetadata.siteUrl + node.fields.slug,
                  guid: siteMetadata.siteUrl + node.fields.slug,
                  date: DateTime.fromISO(node.date.end)
                    // Have it be the next day at 8am, when we typically release
                    // the content.
                    .plus({ days: 1, hours: 8 })
                    .toISO(),
                  enclosure: {
                    url: createPodcastUrl(node.fields.episodeNumber),
                  },
                  custom_elements: [
                    { 'itunes:author': 'The Console Log' },
                    { 'itunes:subtitle': node.title },
                    {
                      'itunes:image': {
                        _attr: {
                          href: siteMetadata.iTunesLogo,
                        },
                      },
                    },
                    { 'itunes:duration': node.duration || '00:00' },
                    { 'itunes:summary': createDescription(node) },
                    { 'itunes:episode': node.fields.episodeNumber },
                  ],
                });
              });
            },
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
    },
  ],
};

const podcastUrlBase =
  'https://chtbl.com/track/E72DG/https://s3.amazonaws.com/the-console-log-podcast';
const createPodcastUrl = input => {
  const episodeNumber = String(input).length === 1 ? `0${input}` : input;
  return `${podcastUrlBase}/E${episodeNumber}.mp3`;
};

function formatDate(date) {
  return DateTime.fromISO(date).toFormat('LLLL d');
}

function getYear(date) {
  return DateTime.fromISO(date).toFormat('y');
}

const createDescription = node => {
  let description = `
Episode ${node.fields.episodeNumber}.
${formatDate(node.date.start)} - ${formatDate(node.date.end)}, ${getYear(
    node.date.end
  )}

SUPPORT OUR PATREON
https://www.patreon.com/theconsolelog

JOIN OUR COMMUNITY
https://usereact.nyc/#slack

FIND US ON TWITTER
https://twitter.com/_theconsolelog
https://twitter.com/hswolff
https://twitter.com/MatthewGerstman

FIND ALL LINKS ON THE WEBSITE
http://theconsolelog.com/episode/${node.fields.episodeNumber}

SHOW NOTES
`;
  node.content.forEach(({ name, links }) => {
    description += `\n# ${name}\n`;

    description += links.join('\n');

    description += '\n';
  });

  return description;
};
