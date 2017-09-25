import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Basic': require('raw!../../examples/Checkboxes/Basic.js.example'),
  'Fieldset With Help and Error Text': require('raw!../../examples/Checkboxes/FieldsetWithHelpAndError.js.example'),
}

export default class CheckboxExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
