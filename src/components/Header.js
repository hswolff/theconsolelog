import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import { layout } from '../utils/constants';
import image from '../images/logo.png';
import youtube from '../images/youtube-64.png';

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
        <Link to="/">Episodes</Link>
        <Bullet />
        <Link to="/episode/tags">Tags</Link>
        <Bullet />
        <a
          href="https://twitter.com/_theconsolelog"
          rel="noopener noreferrer"
          target="_blank"
        >
          Twitter
        </a>
        <Bullet />
        <a
          href="https://www.youtube.com/playlist?list=PL-W0H0WJomJSc1Oa1K0XlIHEKQ0rlVdbc"
          rel="noopener noreferrer"
          target="_blank"
        >
          Watch the Show!
          <img
            src={youtube}
            css={`
              width: 24px;
              height: 24px;
              margin: 0;
              margin-left: 5px;
              margin-bottom: -5px;
            `}
          />
        </a>
      </Right>
    </HeaderInner>
  </header>
);

const HeaderInner = styled('div')`
  max-width: ${layout.width}px;
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
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Bullet = () => (
  <span
    css={`
      display: inline-block;
      margin: 0 10px;
      color: #fff;
    `}
  >
    &bull;
  </span>
);
