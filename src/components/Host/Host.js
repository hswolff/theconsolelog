import React, { Component } from 'react';
import hswolff from './hswolff.jpg';
import MatthewGerstman from './MatthewGerstman.jpg';
import jetpacmonkey from './jetpacmonkey.jpg';

const hosts = {
  hswolff,
  MatthewGerstman,
  jetpacmonkey,
};

export default class Host extends Component {
  render() {
    const { name } = this.props;
    return (
      <a
        href={`https://twitter.com/${name}`}
        target="_blank"
        rel="noopener noreferrer"
        css={`
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
          css={`
            border-radius: 50%;
            width: 100px;
            margin: 0;
            margin-bottom: 10px;
          `}
        />
        <p css={{ margin: 0 }}>@{name}</p>
      </a>
    );
  }
}
