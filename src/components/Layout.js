import React, { Fragment } from 'react';
import { css } from 'emotion';
import { layout } from '../utils/constants';

import Header from './Header';
import Footer from './Footer';
import AboutInfoBox from './AboutInfoBox';
import SEO from './SEO';

export default ({ children }) => (
  <Fragment>
    <SEO />
    <Header />
    <main
      className={css({
        margin: '0 auto',
        maxWidth: layout.width,
        padding: `0px ${layout.paddingY} 1.45rem`,
        paddingTop: 0,
      })}
    >
      <AboutInfoBox />
      {children}
      <Footer />
    </main>
  </Fragment>
);
