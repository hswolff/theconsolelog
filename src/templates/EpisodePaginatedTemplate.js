import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import styled from 'react-emotion';
import Layout from '../components/Layout';
import EpisodeListItem from '../components/EpisodeListItem';

export default ({ pageContext }) => {
  const { group, index, first, last, pageCount, pathPrefix } = pageContext;
  const previousUrl = index - 1 == 1 ? '/' : `${pathPrefix}${index - 1}/`;
  const nextUrl = `${pathPrefix}${index + 1}/`;

  const navProps = { first, previousUrl, index, pageCount, last, nextUrl };

  return (
    <Layout>
      <Helmet title={first ? 'Home' : `Page ${index}`} />
      {group.map(({ node }) => (
        <EpisodeListItem key={node.fields.episodeNumber} {...node} />
      ))}
      <Navigation {...navProps} />
    </Layout>
  );
};

const Navigation = ({
  first,
  previousUrl,
  index,
  pageCount,
  last,
  nextUrl,
}) => (
  <div
    css={`
      margin: 40px 0;
      display: flex;
      justify-content: space-between;
      align-content: center;
      font-size: 80%;
      &, a {
        color: black;
    `}
  >
    <NavButton css={{ visibility: first ? 'hidden' : 'visible ' }}>
      <NavLink test={first} url={previousUrl} text="Go to Previous Page" />
    </NavButton>
    <div css={{ marginTop: '5px' }}>
      Page {index} of {pageCount}
    </div>
    <NavButton css={{ visibility: last ? 'hidden' : 'visible ' }}>
      <NavLink test={last} url={nextUrl} text="Go to Next Page" />
    </NavButton>
  </div>
);

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>;
  } else {
    return <span>{props.text}</span>;
  }
};

const NavButton = styled('div')`
  border-width: 1px;
  border-style: solid;
  border-color: black;
  padding: 5px 10px;
  border-radius: 4px;
  transition: border-color 0.2s ease-in-out;
  &:hover {
    border-color: black;
    a {
      color: black;
    }
  }
  a {
    box-shadow: none;
  }
`;
