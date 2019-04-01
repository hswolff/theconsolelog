import React, { Component } from 'react';
import Typed from 'typed.js';
import styled from '@emotion/styled';
import { layout } from '../utils/constants';
import css from '@emotion/css';

export default () => (
  <Container>
    <TypedText
      strings={[
        'The Console Log' +
          ' is a weekly podcast about JavaScript and the web.' +
          '\n\n' +
          'New Episodes every Wednesday.' +
          '\n\n' +
          'Hosted by <a href="https://twitter.com/hswolff">@hswolff</a> and <a href="https://twitter.com/MatthewGerstman">@MatthewGerstman</a>' +
          '\n\n' +
          'Follow on <a href="https://twitter.com/_theconsolelog">Twitter.</a> <i />',
      ]}
    />
  </Container>
);

const Container = styled('aside')`
  max-width: ${layout.width}px;
  margin: 0 auto;
  border-radius: 4px;
  padding: 1.2rem 1.1rem;
  min-height: 190px;
  background: #dad8d8;
  box-shadow: 0px 1px 2px 0px #797b84;
`;

class TypedText extends Component {
  componentDidMount() {
    this.typed = new Typed(this.el, {
      startDelay: 1000,
      typeSpeed: 30,
      backSpeed: 0,
      showCursor: false,
      fadeOut: true,
      cursorChar: '_',
      autoInsertCss: true,
      ...this.props,
    });
  }

  componentWillUnmount() {
    this.typed.destroy();
  }

  render() {
    return (
      <span css={css({ whiteSpace: 'pre-wrap' })} ref={r => (this.el = r)} />
    );
  }
}
