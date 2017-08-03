import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import {Row, Col} from 'revelry-components/lib/grid'

import './index.scss'

const Header = () => (
  <header className="rev-Header">
    <Link to="/">Ockham</Link>
  </header>
)

const TemplateWrapper = ({
  children
}) => (
    <div>
      <Helmet
        title="Revelry Components"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      >
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css"/>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/monokai.min.css"/>
      </Helmet>
      <Header />
      <div className="rev-Split">
        <div className="rev-Rail">
          <nav className="rev-NavigationOutline">
            <h2>Component Docs</h2>
            <ul>
              <li><Link to="/components/Accordion/">Accordion</Link></li>
            </ul>
          </nav>
        </div>
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
