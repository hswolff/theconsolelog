const path = require('path');

function addFileNameToEpisode({ node, boundActionCreators, getNode }) {
  if (node.internal.type !== 'EpisodesJson') {
    return;
  }

  const parentNode = getNode(node.parent);
  const { createNodeField } = boundActionCreators;

  const episodeNumber = parentNode.name;

  createNodeField({
    node,
    name: 'episodeNumber',
    value: episodeNumber,
  });

  createNodeField({
    node,
    name: 'slug',
    value: `/episode/${episodeNumber}`,
  });
}

exports.onCreateNode = function() {
  return Promise.all(
    [addFileNameToEpisode].map(fn => fn.apply(this, arguments))
  );
};

async function createEpisodePage({ boundActionCreators, graphql }) {
  const { createPage } = boundActionCreators;
  const episodeTemplate = path.resolve('src/templates/EpisodeTemplate.js');

  const result = await graphql(`
    {
      allEpisodesJson(sort: { fields: date___end, order: DESC }) {
        edges {
          node {
            title
            fields {
              episodeNumber
            }
            date {
              start
              end
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    return Promise.reject(result.errors);
  }

  result.data.allEpisodesJson.edges.forEach(({ node }) => {
    const episodeNumber = node.fields.episodeNumber;

    createPage({
      path: `/episode/${episodeNumber}`,
      component: episodeTemplate,
      context: {
        episodeNumber,
      },
    });
  });
}

exports.createPages = function() {
  return Promise.all([createEpisodePage].map(fn => fn.apply(this, arguments)));
};
