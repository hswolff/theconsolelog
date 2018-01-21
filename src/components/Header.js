import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import image from '../images/logo.png';

const maxWidth = 960;

export default () => (
  <header
    css={`
      background: #232121;
      margin-bottom: 1.45rem;
    `}
  >
    <HeaderInner>
      <Left>
        <Link to="/" css={{ margin: 'none', color: 'transparent' }}>
          <Logo src={image} title="The Console Log" />
        </Link>
        <Title>
          <Link to="/">The Console Log</Link>
        </Title>
      </Left>
      <Right>
        <Link to="/episode/tags">Tags</Link>
        <Link to="/about">About</Link>
      </Right>
    </HeaderInner>
  </header>
);

const HeaderInner = styled('div')`
  max-width: ${maxWidth}px;
  margin: 0 auto;
  padding: 1.45rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled('img')`
  width: 64px;
  height: 64px;
  margin: 0;
  &,
  &:hover {
    text-decoration: none;
  }
`;

const Title = styled('h1')`
  font-family: 'American Typewriter', monospace, serif;
  font-weight: normal;
  margin: 0;
  margin-left: 20px;
  a {
    box-shadow: none;
    color: #fff;
    &:hover {
      box-shadow: inherit;
      text-decoration: underline;
    }
  }
`;

const Right = styled('div')`
  a {
    color: #fff;
    box-shadow: none;
    & + a {
      margin-left: 10px;
    }
    &:hover {
      text-decoration: underline;
    }
  }
`;
