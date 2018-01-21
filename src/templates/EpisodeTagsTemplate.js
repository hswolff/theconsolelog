import React from 'react';
import GatsbyLink from 'gatsby-link';

export default function EpisodeTagsTemplate({ pathContext }) {
  const { tags, tag } = pathContext;

  if (tag) {
    const { name, links } = tag;

    return (
      <div>
        <h1>
          {links.length} link{links.length === 1 ? '' : 's'} tagged with {name}
        </h1>
        <ul>
          {links.map(({ name, slug, links }) => {
            return (
              <li key={name}>
                <h1>{name}</h1>
                <ul>
                  {links.map(link => (
                    <li key={link}>
                      <a href={link} target="_blank">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
        <GatsbyLink to="/episode/tags">All tags</GatsbyLink>
      </div>
    );
  }
  return (
    <div>
      <h1>Tags</h1>
      <ul className="tags">
        {Object.keys(tags).map(tagName => {
          const tag = tags[tagName];
          return (
            <li key={tagName}>
              <GatsbyLink to={tag.slug}>
                {tag.name} ({tag.links.length})
              </GatsbyLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
