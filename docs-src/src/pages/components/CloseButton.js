import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'CloseButton': require('raw!../../examples/CloseButton.js.example')
}

export default class CloseButtonExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
