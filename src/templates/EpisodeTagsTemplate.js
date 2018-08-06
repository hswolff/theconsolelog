import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';

export default function EpisodeTagsTemplate({ pageContext }) {
  const { tags, tag } = pageContext;

  if (tag) {
    const { name, links } = tag;

    return (
      <Layout>
        <h1>
          {links.length} link{links.length === 1 ? '' : 's'} tagged with {name}
        </h1>
        <ul>
          {links.map(({ name, links }) => {
            return (
              <li key={name}>
                <h1>{name}</h1>
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
            );
          })}
        </ul>
      </Layout>
    );
  }
  return (
    <Layout>
      <h1>Tags</h1>
      <ul className="tags">
        {Object.keys(tags).map(tagName => {
          const tag = tags[tagName];
          return (
            <li key={tagName}>
              <Link to={tag.slug}>
                {tag.name} ({tag.links.length})
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}
