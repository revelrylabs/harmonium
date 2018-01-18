import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Singular': require('raw!../../examples/Radio/Singular.js.example'),
  'Fieldset': require('raw!../../examples/Radio/Fieldset.js.example'),
}

export default class RadioExamplePage extends Component {
  render() {
    return <div className="rev-Row rev-Row--collapsed">
      <ExampleSection title="Radio Buttons" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
