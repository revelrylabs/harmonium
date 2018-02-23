import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Card': require('raw!../../examples/Card.js.example')
}

export default class CardExamplePage extends Component {
  render() {
    return <div className="rev-Row rev-Row--collapse">
      <ExampleSection title="Cards" examples={examples} depth={1} scope={scope} />
    </div>
  } J
}
