import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Pluralize': require('raw!../../examples/Pluralize.js.example')
}

export default class PluralizeExamplePage extends Component {
  render() {
    return <div className="rev-Row rev-Row--collapsed">
      <ExampleSection title="Pluralize" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
