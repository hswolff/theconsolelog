import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import EpisodeListItem from '../components/EpisodeListItem';

export default ({ data }) => {
  const { allEpisodesJson } = data;
  return (
    <Layout>
      <Helmet title="Home" />
      {allEpisodesJson.edges.map(({ node }) => (
        <EpisodeListItem key={node.fields.episodeNumber} {...node} />
      ))}
    </Layout>
  );
};

export const pageQuery = graphql`
  query AllEpisodes {
    allEpisodesJson(sort: { fields: [date___end], order: DESC }) {
      edges {
        node {
          title
          fields {
            episodeNumber
            slug
          }
          date {
            start
            end
          }
        }
      }
    }
  }
`;
