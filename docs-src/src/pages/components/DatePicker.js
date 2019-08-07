import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  'Without Props': require('raw-loader!../../examples/DatePicker/Basic.js.example'),
  'With Default Value': require('raw-loader!../../examples/DatePicker/WithDefaultValue.js.example'),
  'With Custom Format': require('raw-loader!../../examples/DatePicker/CustomFormat.js.example'),
  'With Error and Help': require('raw-loader!../../examples/DatePicker/WithErrorAndHelp.js.example'),
  'Always Open': require('raw-loader!../../examples/DatePicker/IsOpen.js.example'),
  "Disabled": require('raw-loader!../../examples/DatePicker/Disabled.js.example'),
  'With Component Overrides': require('raw-loader!../../examples/DatePicker/Overrides.js.example'),
  'With Year Selection': require('raw-loader!../../examples/DatePicker/WithYearSelection.js.example'),
  'Filter Selectable Dates': require('raw-loader!../../examples/DatePicker/IsSelectable.js.example'),
  'With Props for Children': require('raw-loader!../../examples/DatePicker/WithPropsToChildren.js.example'),
  'With Custom Change Handler': require('raw-loader!../../examples/DatePicker/WithCustomHandler.js.example'),
  'With Highlights Array': require('raw-loader!../../examples/DatePicker/HighlightsArray.js.example'),
  'With Highlights Object': require('raw-loader!../../examples/DatePicker/HighlightsObject.js.example'),
  'With Highlights Function': require('raw-loader!../../examples/DatePicker/HighlightsFunction.js.example'),
  'With Highlights Function And Class': require('raw-loader!../../examples/DatePicker/HighlightsFunctionAndClass.js.example'),
  "Overlay": require('raw-loader!../../examples/DatePicker/Overlay.js.example'),
}

export default class DatePickerExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Date Picker"
          metaDescription={
            'The date picker component allows users to select a date from a calendar.'
          }
          extraKeywords="Component, Date Picker, Forms"
        >
          <p>
            The date picker component allows users to select a date from a
            calendar. It is very flexible. It has many options to allow
            different modes of date selection, and different behavior. For
            example, you can highlight or filter dates arbitrarily.
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
