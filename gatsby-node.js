const path = require('path');

// Lifecycle methods

exports.onCreateNode = function() {
  return Promise.all(
    [addFileNameToEpisode].map(fn => fn.apply(this, arguments))
  );
};

exports.createPages = async function({ boundActionCreators, graphql }) {
  const result = await graphql(`
    {
      allEpisodesJson(sort: { fields: date___end, order: DESC }) {
        edges {
          node {
            title
            fields {
              episodeNumber
              slug
            }
            content {
              name
              links
              tags
            }
            overflow {
              name
              links
              tags
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    return Promise.reject(result.errors);
  }

  const { createPage } = boundActionCreators;
  const edges = result.data.allEpisodesJson.edges;

  createEpisodePage({
    createPage,
    edges,
  });
  createTagPages({
    createPage,
    edges,
  });
};

// Implementations

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

function createEpisodePage({ edges, createPage }) {
  const episodeTemplate = path.resolve('src/templates/EpisodeTemplate.js');

  edges.forEach(({ node }) => {
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

function createTagPages({ createPage, edges }) {
  const tagTemplate = path.resolve('src/templates/EpisodeTagsTemplate.js');

  const tags = {};

  edges.forEach(({ node }) => {
    node.content.concat(node.overflow).forEach(linkItem => {
      linkItem.tags.forEach(tag => {
        if (!tags[tag]) {
          tags[tag] = {
            name: tag,
            slug: `/episode/tags/${tag}`,
            links: [],
          };
        }
        tags[tag].links.push(linkItem);
      });
    });
  });

  // Create the tags page with the list of tags from our tags object.
  createPage({
    path: '/episode/tags',
    component: tagTemplate,
    context: {
      tags,
    },
  });

  // For each of the tags in the post object, create a tag page.

  for (const tagName in tags) {
    const tag = tags[tagName];

    createPage({
      path: tag.slug,
      component: tagTemplate,
      context: {
        tag,
      },
    });
  }
}
