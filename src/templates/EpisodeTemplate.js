import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import EpisodeListItem from '../components/EpisodeListItem';

export default function EpisodeTempalate({ data: { episodesJson } }) {
  const {
    title,
    fields: { episodeNumber },
    content,
    overflow,
    youtube,
  } = episodesJson;

  return (
    <div>
      <Helmet title={`E${episodeNumber}: ${title}`} />
      <EpisodeListItem {...episodesJson} linked={false} />
      {youtube && (
        <Fragment>
          <iframe
            src={`https://www.youtube.com/embed/${
              youtube.id
            }?rel=0&amp;showinfo=0`}
            frameBorder={0}
            allow="autoplay; encrypted-media"
            allowFullScreen
            css={`
              @media (min-width: 1000px) {
                width: 800px;
                height: 450px;
              }
            `}
          />
          <p>
            <a
              href={`https://www.youtube.com/watch?v=${youtube.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on YouTube
            </a>
          </p>
        </Fragment>
      )}

      <h2>Show Links</h2>
      <Links content={content} />
      <h2>Overflow Links</h2>
      <Links content={overflow} />
    </div>
  );
}

const Links = ({ content }) => (
  <ul>
    {content.map(({ name, links }) => (
      <li key={name}>
        {name}
        <ul>
          {links.map(link => (
            <li key={link}>
              <a href={link} target="_blank" rel="noopener noreferrer">
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
      youtube {
        id
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
