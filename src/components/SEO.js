import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import logoImage from '../images/logo.png';

const twitterHandle = '@_theconsolelog';

export default function SEO({
  title: titleProp,
  description: descriptionProp,
  postSlug,
  image: imageProp,
  isBlogPost,
}) {
  return (
    <StaticQuery
      query={graphql`
        query LayoutData {
          site {
            siteMetadata {
              title
              description
              siteUrl
              keywords
            }
          }
        }
      `}
      render={({ site: { siteMetadata } }) => {
        const title = titleProp || siteMetadata.title;
        const description = descriptionProp || siteMetadata.description;
        const image = imageProp || `${siteMetadata.siteUrl}${logoImage}`;
        let url = siteMetadata.siteUrl;
        if (postSlug) {
          url += postSlug;
        }
        return (
          <Helmet
            title={siteMetadata.title}
            titleTemplate={`%s | ${siteMetadata.title}`}
          >
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="keywords" content={siteMetadata.keywords} />
            {/* The real MVP: https://moz.com/blog/meta-data-templates-123 */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {/* <!-- Twitter Card data --> */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:creator" content={twitterHandle} />
            <meta name="twitter:image" content={image} />
            {/* <!-- Open Graph data --> */}
            <meta property="og:title" content={title} />
            {isBlogPost && <meta property="og:type" content="article" />}
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={siteMetadata.title} />
          </Helmet>
        );
      }}
    />
  );
}
