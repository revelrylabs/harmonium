import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import InputVars from './InputTables/InputVars'
import InputProps from './InputTables/InputProps'
import Headers from '../../Headers'

const examples = {
  "Basic": require('raw!../../examples/Input/Basic.js.example'),
  "Stack": require('raw!../../examples/Input/Stack.js.example'),
  'File Input': require('raw!../../examples/Input/FileInput.js.example'),
}

export default class InputExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <Headers
          title="Input"
          metaDescription={
            'The Input component makes a form input. It supports a variety of ' +
            'configurations, including stacked inputs, with and without labels, ' +
            'with and without help text, etc.'
          }
          extraKeywords="Component, Input, Forms"
        >
          <p>
            The Input component makes a form input. It supports a variety of
            configurations, including stacked inputs, with and without labels,
            with and without help text, etc.
          </p>
        </Headers>
        <ExampleSection
          title="Examples"
          examples={examples}
          depth={1}
          scope={scope}
        />
        <h3>Variables:</h3>
        <InputVars />
        <h3>Properties:</h3>
        <InputProps />
      </div>
    )
  }
}
