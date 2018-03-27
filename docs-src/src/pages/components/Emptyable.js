import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  Emptyable: require('raw!../../examples/Emptyable.js.example'),
}

export default class EmptyableExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <ExampleSection title="Emptyable" examples={examples} depth={1}
scope={scope} />
      </div>
    )
  }
}
