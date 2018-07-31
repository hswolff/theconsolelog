import React, { Component } from 'react';

export default class AudioPlayer extends Component {
  render() {
    const { src } = this.props;
    return (
      <audio
        controls
        src={src}
        css={`
          width: 100%;
        `}
      >
        Your browser does not support the <code>audio</code> element.
      </audio>
    );
  }
}
