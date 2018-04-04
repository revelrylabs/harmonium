import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  Standalone: require('raw!../../examples/InputGroup/Standalone.js.example'),
  Stack: require('raw!../../examples/InputGroup/Stack.js.example'),
}

export default class InputGroupExamplePage extends Component {
  render() {
    return (
      <div>
        <ExampleSection
          title="Input Groups"
          examples={examples}
          depth={1}
          scope={scope}
        />
      </div>
    )
  }
}
