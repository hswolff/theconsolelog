import React, { Component } from 'react';
import hswolff from './hswolff.jpg';
import MatthewGerstman from './MatthewGerstman.jpg';
import jetpacmonkey from './jetpacmonkey.jpg';
import swyx from './swyx.jpg';
import codehitchhiker from './codehitchhiker.jpg';
import kentcdodds from './kentcdodds.jpg';
import css from '@emotion/css';

const hosts = {
  hswolff,
  MatthewGerstman,
  jetpacmonkey,
  swyx,
  codehitchhiker,
  kentcdodds,
};

export default class Host extends Component {
  render() {
    const { name } = this.props;
    return (
      <a
        href={`https://twitter.com/${name}`}
        target="_blank"
        rel="noopener noreferrer"
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: none;
          &:hover {
            text-decoration: underline;
          }
          & + & {
            margin-left: 30px;
          }
        `}
      >
        <img
          src={hosts[name]}
          css={css`
            border-radius: 50%;
            width: 100px;
            margin: 0;
            margin-bottom: 10px;
          `}
        />
        <p css={css({ margin: 0 })}>@{name}</p>
      </a>
    );
  }
}
