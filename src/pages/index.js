import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import { DateTime } from 'luxon';

export default ({ data }) => {
  const { allEpisodesJson } = data;
  return (
    <React.Fragment>
      <Helmet title="Home" />
      {allEpisodesJson.edges.map(({ node }) => (
        <EpisodeItem key={node.fields.episodeNumber} {...node} />
      ))}
    </React.Fragment>
  );
};

const EpisodeItem = ({ fields: { slug, episodeNumber }, title, date }) => (
  <div>
    <span>Episode: {episodeNumber}</span>
    <h3>
      <Link to={slug}>{title}</Link>
    </h3>
    <div>
      {formatDate(date.start)} - {formatDate(date.end)}
    </div>
  </div>
);

function formatDate(date) {
  return DateTime.fromISO(date).toFormat('LLLL d');
}

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
