import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

export default () => (
  <div>
    <Helmet title="About" />
    <h1>About</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </div>
);
