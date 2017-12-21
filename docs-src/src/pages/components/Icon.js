import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Basic': require('raw!../../examples/Icon/Basic.js.example'),
  'Foundation': require('raw!../../examples/Icon/Foundation.js.example')
}

export default class IconExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Icons" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
