import React from 'react';
import Helmet from 'react-helmet';

export default function EpisodeTempalate({ data: { episodesJson } }) {
  const { title, fields: { episodeNumber }, content, overflow } = episodesJson;
  return (
    <div className="blog-post-container">
      <Helmet title={`E${episodeNumber}: ${title}`} />
      <div className="blog-post">
        <h1>{title}</h1>
        <h2>Number: {episodeNumber}</h2>
      </div>
      <Links content={content} />
      <h2>Overflow</h2>
      <Links content={overflow} />
    </div>
  );
}

const Links = ({ content }) => (
  <ul>
    {content.map(({ name, links }) => (
      <li>
        {name}
        <ul>
          {links.map(link => (
            <li>
              <a href={link} target="_blank">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

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
