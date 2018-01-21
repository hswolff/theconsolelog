import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

export default ({ data }) => {
  const { allEpisodesJson } = data;
  return (
    <React.Fragment>
      <Helmet title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
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
      {date.start} - {date.end}
    </div>
  </div>
);

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
