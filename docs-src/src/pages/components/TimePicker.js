import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  'Without Props': require('raw-loader!../../examples/TimePicker/Basic.js.example'),
  'With Default Value': require('raw-loader!../../examples/TimePicker/DefaultValue.js.example'),
  'With Error and Help': require('raw-loader!../../examples/TimePicker/ErrorAndHelp.js.example'),
  'Always Open': require('raw-loader!../../examples/TimePicker/AlwaysOpen.js.example'),
  "Disabled": require('raw-loader!../../examples/TimePicker/Disabled.js.example'),
  'With 24 Hour Clock': require('raw-loader!../../examples/TimePicker/TwentyFourHour.js.example'),
  'With Seconds Shown': require('raw-loader!../../examples/TimePicker/ShowSeconds.js.example'),
  "Overlay": require('raw-loader!../../examples/TimePicker/Overlay.js.example'),
}

export default class TimePickerExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Time picker"
          metaDescription={
            'The time picker component allows the user to select a time, with ' +
            'formatting and validation. It also permits the selection of times ' +
            'using a set of buttons.'
          }
          extraKeywords="Component, Time picker, Time Input, Input, Forms"
        >
          <p>
            The time picker component allows the user to select a time, with
            formatting and validation. It also permits the selection of times
            using a set of buttons. It supports a similar set of options as
            DatePicker and Input.
          </p>
        </Headers>
        <ExampleSection
          title="Examples"
          examples={examples}
          depth={1}
          scope={scope}
        />
      </div>
    )
  }
}
