import React from 'react';

export default () => {
  return (
    <a
      href="https://www.patreon.com/bePatron?u=9399313"
      data-patreon-widget-type="become-patron-button"
    >
      Become a Patron!
      <div
        dangerouslySetInnerHTML={`<script async src="https://c6.patreon.com/becomePatronButton.bundle.js"></script>`}
      />
    </a>
  );
};
