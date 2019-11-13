import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self'; script-src 'self' https://platform.twitter.com https://c6.patreon.com https://buttons.github.io https://matomo.riot.im; img-src 'self' data:; connect-src 'self'; font-src 'self' data:; media-src 'self'; child-src 'self'; form-action 'self'; object-src 'self'" />
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@matrixdotorg" />
        <meta name="twitter:creator" content="@matrixdotorg" />
        <link rel="stylesheet" type="text/css" href="/css/normalize.css" />
        <link rel="stylesheet" type="text/css" href="/css/webflow.css" />
        <link rel="stylesheet" type="text/css" href="/css/matrix-org.webflow.css" />
        <link rel="stylesheet" type="text/css" href="/css/webflow-overrides.css" />
        <link rel="stylesheet" type="text/css" href="/css/prism.css" />

        <script src="/js/jquery-3.4.1.min.js" type="text/javascript"></script>
        <script type="text/javascript" src="/js/matomo.js"></script>
        <noscript><p><img src="//matomo.riot.im/matomo.php?idsite=3&amp;rec=1" style={{"border": 0}} alt="" /></p></noscript>
      </head>
      <body className="body" {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script src="/js/webflow-loader.js" type="text/javascript"></script>
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
