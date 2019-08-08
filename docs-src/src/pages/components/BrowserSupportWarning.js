import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  'Warn unless Chrome 45+ or IE 10+': require('raw-loader!../../examples/BrowserSupportWarning/Chrome45.js.example'),
  'Warn unless Chrome 9999+ or IE 9999+': require('raw-loader!../../examples/BrowserSupportWarning/Chrome9999.js.example'),
}

export default class BrowserSupportWarningExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <Headers
          title="Browser Support Warning"
          metaDescription={
            'BrowserSupportWarning is a utility component for displaying a message ' +
            "if the user's browser is not supported by the site."
          }
          extraKeywords="Component, Browser Support Warning, Warning, Dialog"
        >
          <p>
            BrowserSupportWarning is a utility component for displaying a message
            if the user's browser is not supported by the site.
          </p>
        </Headers>
        <ExampleSection
          title="Examples"
          examples={examples}
          depth={1}
          scope={scope}
        />
      </div>
    )
  }
}
