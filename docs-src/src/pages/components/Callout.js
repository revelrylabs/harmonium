import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Callout': require('raw!../../examples/Callout.js.example')
}

export default class CalloutExamplePage extends Component {
  render() {
    return <div className="rev-Row rev-Row--collapse">
      <ExampleSection title="Callouts" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
