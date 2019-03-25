import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import AudioPlayer from '../components/AudioPlayer';
import EpisodeListItem from '../components/EpisodeListItem';
import Host from '../components/Host';
import Disqus from '../components/Disqus';
import SEO from '../components/SEO';

export default function EpisodeTemplate({ data: { episodesJson } }) {
  const {
    title,
    fields: { episodeNumber, slug },
    hosts,
    content,
    overflow,
    youtube,
  } = episodesJson;

  return (
    <Layout>
      <Helmet title={`E${episodeNumber}: ${title}`} />
      <SEO
        title={title}
        description={`Episode: ${episodeNumber}`}
        postSlug={slug}
        isBlogPost
      />
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
      <AudioPlayer
        src={`https://chtbl.com/track/E72DG/https://s3.amazonaws.com/the-console-log-podcast/E${episodeNumber}.mp3`}
      />
      <h2>Hosts</h2>
      <div
        css={`
          display: flex;
          flex-direction: row;
        `}
      >
        {hosts.map(name => (
          <Host key={name} name={name} />
        ))}
      </div>
      <h2>Show Links</h2>
      <Links content={content} />
      <h2>Overflow Links</h2>
      <Links content={overflow} />
      <Disqus />
    </Layout>
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
        slug
      }
      youtube {
        id
      }
      date {
        start
        end
      }
      hosts
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
