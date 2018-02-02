import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import {Row, Col} from 'possum/lib/grid'
import TopBar from 'possum/lib/TopBar'
import Navigation from './Navigation'

import './index.scss'

const TemplateWrapper = ({
  children
}) => (
    <div>
      <Helmet
        title="React Components for Teams That Move Fast | Possum"
        meta={[
          { name: 'description', content: 'An opinionated React component framework for teams that move fast.' },
          { name: 'keywords', content: 'React, JavaScript, SCSS, CSS, HTML, Web' },
        ]}
      >
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css"/>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/monokai.min.css"/>
      </Helmet>
      <TopBar fixed className="Show--smallOnly">
        <Link className="rev-Brand" to="/"><h1>Possum</h1>
          <small>Version 3.1.1</small>
        </Link>
      </TopBar>
      <div className="rev-ContentWrapper">
        <Navigation />
        <main className="rev-Content">
          {children()}
        </main>
      </div>
    </div>
  )

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
