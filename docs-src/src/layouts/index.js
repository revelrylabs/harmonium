import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import TopBar from 'harmonium/lib/TopBar'
import Navigation from './Navigation'
import packageInfo from '../../../package.json'

import './index.scss'

const TemplateWrapper = (props) => {
  const description = props.description ? props.description : 'An opinionated React component framework for teams that move fast.'

  return <div>
    <Helmet
      title="Harmonium | React Components for Teams That Move Fast"
      meta={[
        {
          name: 'description',
          content: description,
        },
        {name: 'keywords', content: 'React, JavaScript, SCSS, CSS, HTML, Web'},
      ]}
    >
      {/* FAVICONS */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6422EB" />
      <meta name="msapplication-TileColor" content="#6422EB" />
      <meta name="theme-color" content="#6422EB" />
      {/* OG META */}
      <meta property="og:image" content="/og-image.jpg" />
      <meta property="og:image:width" content="279" />
      <meta property="og:image:height" content="279" />
      <meta property="og:title" content="Harmonium" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://harmonium.revelry.co/" />
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css"
      />
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.38.0/theme/lucario.min.css"
      />
      <link
        rel="canonical"
        href={`https://harmonium.revelry.co${props.location.pathname}`}
      />
    </Helmet>
    <TopBar className="Show--smallOnly">
      <a className="rev-Brand ExampleBrand Show--smallOnly" href="/">
        <img src="/images/harmonium-logo.png" alt="Harmonium"/>
        <small>Version {packageInfo.version}</small>
      </a>
    </TopBar>
    <div className="rev-ContentWrapper">
      <Navigation />
      <main className="rev-Content">{props.children}</main>
    </div>
  </div>
}

TemplateWrapper.propTypes = {
  children: PropTypes.object,
}

export default TemplateWrapper
