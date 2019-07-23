import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import {Row, Col} from 'harmonium/lib/grid'
import TopBar from 'harmonium/lib/TopBar'
import Menu from 'harmonium/lib/Menu'
import Navigation from './Navigation'
import packageInfo from '../../../package.json'

import './index.scss'

const TemplateWrapper = ({children, location}) => (
  <div>
    <Helmet
      title="Harmonium | React Components for Teams That Move Fast"
      meta={[
        {
          name: 'description',
          content:
            'An opinionated React component framework for teams that move fast.',
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
      <meta property="og:description" content="React components for teams that move fast." />
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
        href={`https://harmonium.revelry.co${location.pathname}`}
      />
    </Helmet>
    <TopBar className="Show--smallOnly">
      <Link className="rev-Brand ExampleBrand Show--smallOnly" to="/">
        <img src="/images/harmonium-logo.png" alt="Harmonium"/>
        <small>Version {packageInfo.version}</small>
      </Link>
    </TopBar>
    <div className="rev-ContentWrapper">
      <Navigation />
      <main className="rev-Content">{children()}</main>
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
