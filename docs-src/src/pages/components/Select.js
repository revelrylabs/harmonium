import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Option As Children And Options As Props': require('raw!../../examples/Select/OptionChildrenVsOptionsProp.js.example'),
  'Multiple Select With Values': require('raw!../../examples/Select/MultipleValues.js.example'),
  'Select Stacks': require('raw!../../examples/Select/Stacks.js.example'),
}

export default class SelectExamplePage extends Component {
  render() {
    return (
      <div>
        <ExampleSection title="Selects" examples={examples} depth={1}
scope={scope} />
      </div>
    )
  }
}
