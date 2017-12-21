import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Warn unless Chrome 45+ or IE 10+': require('raw!../../examples/BrowserSupportWarning/Chrome45.js.example'),
  'Warn unless Chrome 9999+ or IE 9999+': require('raw!../../examples/BrowserSupportWarning/Chrome9999.js.example'),
}

export default class BrowserSupportWarningExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
