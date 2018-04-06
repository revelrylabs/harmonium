import PropTypes from 'prop-types'
import React, {Component, Children} from 'react'
import Helmet from 'react-helmet'

const Headers = ({children, extraKeywords, metaDescription, title}) => {
  const keywordString = extraKeywords ? `, ${extraKeywords}` : ''

  return (
    <div>
      <Helmet
        title={`${title} | Possum | React Components for Teams That Move Fast`}
        meta={[
          {
            name: 'description',
            content: metaDescription,
          },
          {
            name: 'keywords',
            content: `React, JavaScript, SCSS, CSS, HTML, Web${keywordString}`,
          },
        ]}
      >
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css"
        />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/monokai.min.css"
        />
      </Helmet>
      <h1>{title}</h1>
      {children}
    </div>
  )
}

Headers.propTypes = {
  children: PropTypes.node,
  extraKeywords: PropTypes.string,
  metaDescription: PropTypes.string,
  title: PropTypes.string,
}

export default Headers
