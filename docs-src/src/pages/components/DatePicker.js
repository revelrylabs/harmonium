import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Datepicker': require('raw!../../examples/Datepicker/Basic.js.example')
}

export default class DatePickerExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Date Picker" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
