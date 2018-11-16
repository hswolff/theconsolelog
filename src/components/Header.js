import React from 'react';
import { Link } from 'gatsby';
import styled from 'react-emotion';
import { layout } from '../utils/constants';
import image from '../images/logo.png';
import podcast from '../images/podcast.svg';

export default () => (
  <header
    css={`
      background: #232121;
      margin-bottom: 1.45rem;
    `}
  >
    <HeaderInner>
      <LogoContainer>
        <Link to="/" css={{ boxShadow: 'none' }}>
          <Logo src={image} title="The Console Log" />
        </Link>
        <Title>
          <Link to="/">The Console Log</Link>
        </Title>
      </LogoContainer>
      <Nav>
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
        <NavItem>
          Podcast
          {'  '}
          <img
            src={podcast}
            css={`
              max-width: inherit;
              width: 24px;
              height: 24px;
              margin: 0;
              margin-left: 5px;
              margin-bottom: -5px;
            `}
          />
        </NavItem>
        {'  '}
        <a
          href="https://itunes.apple.com/us/podcast/the-console-log/id1411181947"
          rel="noopener noreferrer"
          target="_blank"
        >
          iTunes
        </a>
        <Bullet />
        <a
          href="https://play.google.com/music/listen#/ps/Ioyfudzgzrcnfpwcrisw7la7jnu"
          rel="noopener noreferrer"
          target="_blank"
        >
          Google Play
        </a>
        <Bullet />
        <a
          href="https://open.spotify.com/show/2SlPOIWzAphYdO5MkFFaKu"
          rel="noopener noreferrer"
          target="_blank"
        >
          Spotify
        </a>
      </Nav>
    </HeaderInner>
  </header>
);

const HeaderInner = styled('div')`
  max-width: ${layout.width}px;
  margin: 0 auto;
  padding: 1.45rem ${layout.paddingY};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;

const LogoContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled('img')`
  width: 64px;
  height: 64px;
  margin: 0;
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

const Nav = styled('nav')`
  a {
    color: #fff;
    box-shadow: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const NavItem = styled('span')`
  color: #fff;
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
