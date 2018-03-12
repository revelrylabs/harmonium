import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Stateless': require('raw!../../examples/Sticky/Stateless.js.example'),
  'Stateful': require('raw!../../examples/Sticky/Stateful.js.example'),
}

export default class StickyExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Sticky" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
