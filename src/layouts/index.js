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
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header />
    <AboutInfoBox />
    <div
      className={css({
        margin: '0 auto',
        maxWidth: layout.width,
        padding: '0px 0 1.45rem',
        paddingTop: 0,
      })}
    >
      {children()}
    </div>
    <Footer />
  </Fragment>
);
