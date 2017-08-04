import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Stateful': require('raw!../../examples/ExpandingCol/Stateful.js.example'),
  'Stateless': require('raw!../../examples/ExpandingCol/Stateless.js.example'),
}

export default class ExpandingColExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
