import React from 'react';
import Helmet from 'react-helmet';
import EpisodeListItem from '../components/EpisodeListItem';

export default ({ data }) => {
  const { allEpisodesJson } = data;
  return (
    <React.Fragment>
      <Helmet title="Home" />
      {allEpisodesJson.edges.map(({ node }) => (
        <EpisodeListItem key={node.fields.episodeNumber} {...node} />
      ))}
    </React.Fragment>
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
