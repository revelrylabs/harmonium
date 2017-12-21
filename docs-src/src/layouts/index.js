import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import {Row, Col} from 'revelry-components/lib/grid'
import TopBar from 'revelry-components/lib/TopBar'
import Navigation from './Navigation'

import './index.scss'

const Header = () => (
  <TopBar fixed>
    <Row>
      <Col>
        <Link to="/">Possum</Link>
      </Col>
    </Row>
  </TopBar>
)

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
      <Header />
      <div className="rev-Split rev-ContentWrapper">
        <Navigation />
        <div className="rev-MainPanel">
          <main className="rev-MainPanel-content">
            {children()}
          </main>
        </div>
      </div>
    </div>
  )

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
