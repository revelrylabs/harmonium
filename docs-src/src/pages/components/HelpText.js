import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'HelpText': require('raw!../../examples/HelpText.js.example')
}

export default class HelpTextExamplePage extends Component {
  render() {
    return <div className="rev-Row rev-Row--collapse">
      <ExampleSection title="Help Text" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
