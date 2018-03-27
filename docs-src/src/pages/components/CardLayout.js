import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  CardLayout: require('raw!../../examples/CardLayout.js.example'),
}

export default class CardLayoutExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <ExampleSection title="Card Layouts" examples={examples} depth={1}
scope={scope} />
      </div>
    )
  }
}
