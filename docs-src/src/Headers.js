import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

const Headers = ({children, extraKeywords, metaDescription, title}) => {
  const keywordString = extraKeywords ? `, ${extraKeywords}` : ''
  let extendedTitle = `${title} | Possum | React Components for Teams That Move Fast`

  if (extendedTitle.length >= 70) {
    // Trim title down if it is over 70 characters for better display & indexing
    extendedTitle = `${title} | Possum | React Components`
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
