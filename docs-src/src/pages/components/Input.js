import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  "Basic": require('raw!../../examples/Input/Basic.js.example'),
  "Stack": require('raw!../../examples/Input/Stack.js.example'),
  'File Input': require('raw!../../examples/Input/FileInput.js.example'),
}

export default class InputExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <ExampleSection title="Inputs" examples={examples} depth={1}
scope={scope} />
      </div>
    )
  }
}
