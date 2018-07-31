import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { css } from 'emotion';
import { layout } from '../utils/constants';

import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutInfoBox from '../components/AboutInfoBox';

export default ({ children }) => (
  <Fragment>
    <Helmet
      title="The Console Log"
      titleTemplate="%s | The Console Log"
      meta={[
        {
          name: 'description',
          content: 'A weekly podcast about JavaScript and the web.',
        },
        { name: 'keywords', content: 'podcast, show, javascript, news' },
      ]}
    />
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

      {children()}
      <Footer />
    </main>
  </Fragment>
);
