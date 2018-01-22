import React from 'react';
import styled from 'react-emotion';
import { layout } from '../utils/constants';

export default () => (
  <Footer>
    <Left>The Console Log</Left>
    <Right>
      <span>New Episodes Weekly</span>
      <Bullet />
      <a
        href="https://github.com/hswolff/theconsolelog"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </Right>
  </Footer>
);

const Footer = styled('div')`
  max-width: ${layout.width}px;
  margin: 0 auto;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7rem;
  border-top: 1px solid #232121;
`;

const Left = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Right = styled('div')``;

const Bullet = () => (
  <span
    css={`
      display: inline-block;
      margin: 0 10px;
    `}
  >
    &bull;
  </span>
);
