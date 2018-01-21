import React from 'react';
import Helmet from 'react-helmet';

export default function EpisodeTempalate({ data: { episodesJson } }) {
  const { title, fields: { episodeNumber } } = episodesJson;
  return (
    <div className="blog-post-container">
      <Helmet title={`E${episodeNumber}: ${title}`} />
      <div className="blog-post">
        <h1>{title}</h1>
        <h2>Number: {episodeNumber}</h2>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query EpisodeByNumber($episodeNumber: String!) {
    episodesJson(fields: { episodeNumber: { eq: $episodeNumber } }) {
      title
      fields {
        episodeNumber
      }
      date {
        start
        end
      }
      content {
        name
        links
      }
      overflow {
        name
        links
      }
    }
  }
`;
