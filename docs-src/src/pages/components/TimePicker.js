import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Basic': require('raw!../../examples/TimePicker/Basic.js.example')
}

export default class TimePickerExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Time Picker" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
