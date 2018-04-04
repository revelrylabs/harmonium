import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  Currency: require('raw!../../examples/Currency.js.example'),
}

export default class CurrencyExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <ExampleSection title="Currency" examples={examples} depth={1}
scope={scope} />
      </div>
    )
  }
}
