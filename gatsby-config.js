const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'The Console Log',
    description: 'A weekly show about all the latest JavaScript and web news.',
    siteUrl: 'http://theconsolelog.com',
    iTunesLogo: 'https://theconsolelog.com/itunes-logo.jpeg',
  },
  plugins: [
    'gatsby-plugin-react-next',
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
              { 'itunes:explicit': 'yes' },
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
                    podcast {
                      url
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
                const hasPodcast = node.podcast && node.podcast.url;

                let rssResult = Object.assign({}, node, {
                  description: `Episode ${node.fields.episodeNumber}.`,
                  url: siteMetadata.siteUrl + node.fields.slug,
                  guid: siteMetadata.siteUrl + node.fields.slug,
                  date: new Date(node.date.end),
                });

                if (hasPodcast) {
                  rssResult = {
                    ...rssResult,
                    enclosure: {
                      url: node.podcast.url,
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
                      { 'itunes:duration': node.duration || '00:00:00' },
                      {
                        'itunes:summary': (function() {
                          let summary = 'Show links!';

                          node.content.forEach(({ name, links }) => {
                            summary += `\n${name}`;

                            links.forEach(link => {
                              summary += `\n\t* ${link}`;
                            });

                            summary += '\n';
                          });

                          return summary;
                        })(),
                      },
                    ],
                  };
                }

                return rssResult;
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
