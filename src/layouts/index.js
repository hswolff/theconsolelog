import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { css } from 'emotion';

import Header from '../components/Header';

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
    <div
      className={css({
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 0 1.45rem',
        paddingTop: 0,
      })}
    >
      {children()}
    </div>
  </Fragment>
);
