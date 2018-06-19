import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

const Headers = ({children, extraKeywords, metaDescription, title}) => {
  const keywordString = extraKeywords ? `, ${extraKeywords}` : ''
  let extendedTitle = `${title} | Harmonium | React Components for Teams That Move Fast`

  if (extendedTitle.length >= 60) {
    // Trim title down if it is over 60 characters for better display & indexing
    extendedTitle = `${title} | Harmonium | React Components`
    if (extendedTitle.length >= 60) {
      extendedTitle = `${title} | Harmonium`
    }
  }

  return (
    <div>
      <Helmet
        title={extendedTitle}
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
          href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.38.0/theme/lucario.min.css"
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
