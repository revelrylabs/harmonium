import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  "Basic": require('raw-loader!../../examples/Input/Basic.js.example'),
  "Stack": require('raw-loader!../../examples/Input/Stack.js.example'),
  'File Input': require('raw-loader!../../examples/Input/FileInput.js.example'),
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
      </div>
    )
  }
}
