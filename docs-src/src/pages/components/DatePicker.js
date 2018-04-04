import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Without Props': require('raw!../../examples/DatePicker/Basic.js.example'),
  'With Default Value': require('raw!../../examples/DatePicker/WithDefaultValue.js.example'),
  'With Custom Format': require('raw!../../examples/DatePicker/CustomFormat.js.example'),
  'With Error and Help': require('raw!../../examples/DatePicker/WithErrorAndHelp.js.example'),
  'Always Open': require('raw!../../examples/DatePicker/IsOpen.js.example'),
  "Disabled": require('raw!../../examples/DatePicker/Disabled.js.example'),
  'With Component Overrides': require('raw!../../examples/DatePicker/Overrides.js.example'),
  'Filter Selectable Dates': require('raw!../../examples/DatePicker/IsSelectable.js.example'),
  'With Props for Children': require('raw!../../examples/DatePicker/WithPropsToChildren.js.example'),
  'With Custom Change Handler': require('raw!../../examples/DatePicker/WithCustomHandler.js.example'),
  'With Highlights Array': require('raw!../../examples/DatePicker/HighlightsArray.js.example'),
  'With Highlights Object': require('raw!../../examples/DatePicker/HighlightsObject.js.example'),
  'With Highlights Function': require('raw!../../examples/DatePicker/HighlightsFunction.js.example'),
  'With Highlights Function And Class': require('raw!../../examples/DatePicker/HighlightsFunctionAndClass.js.example'),
  "Overlay": require('raw!../../examples/DatePicker/Overlay.js.example'),
}

export default class DatePickerExamplePage extends Component {
  render() {
    return (
      <div>
        <ExampleSection
          title="Date Picker"
          examples={examples}
          depth={1}
          scope={scope}
        />
      </div>
    )
  }
}
