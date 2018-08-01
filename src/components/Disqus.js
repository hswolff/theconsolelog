import React, { Component } from 'react';

let hasLoaded = false;
function maybeLoadDisqusScript(shortname, onLoad) {
  if (hasLoaded) {
    onLoad();
    return;
  }
  window.disqus_config = function() {};

  const script = document.createElement('script');
  script.src = `//${shortname}.disqus.com/embed.js`;
  script.async = true;
  script.onload = onLoad;
  document.body.appendChild(script);
  hasLoaded = true;
}

export default class Disqus extends Component {
  static defaultProps = {
    shortname: 'the-console-log-1',
    urlDomain: 'theconsolelog.com',
    url: '/',
    identifier: '',
    title: '',
  };

  componentDidMount() {
    if (typeof window !== 'undefined' && window.document) {
      const { shortname, urlDomain, url, identifier, title } = this.props;

      maybeLoadDisqusScript(shortname, () => {
        window.DISQUS.reset({
          reload: true,
          config: function() {
            const { location } = window;
            this.page.url = `${location.protocol}//${urlDomain}${url}`;
            this.page.identifier = identifier;
            this.page.title = title;
          },
        });
      });
    }
  }

  render() {
    return <div id="disqus_thread" />;
  }
}
