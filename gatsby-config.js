const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'The Console Log',
    description: 'A weekly YouTube show about JavaScript and the web.',
    siteUrl: 'http://theconsolelog.com',
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
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allEpisodesJson } }) => {
              return allEpisodesJson.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  description: `Episode ${edge.node.fields.episodeNumber}.`,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                });
              });
            },
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
                    date {
                      start
                      end
                    }
                  }
                }
              }
            }
          `,
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
