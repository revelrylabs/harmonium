import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Stateless': require('raw!../../examples/Tabs/Stateless.js.example'),
  'Stateful': require('raw!../../examples/Tabs/Stateful.js.example'),
}

export default class TabsExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
