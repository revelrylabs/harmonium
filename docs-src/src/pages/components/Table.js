import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  Textarea: require('raw!../../examples/Textarea.js.example'),
}

export default class TextareaExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Textarea"
          metaDescription={
            'The textarea component renders a textarea input. It behaves in the ' +
            'same way as the Input component, so the two can be used ' +
            'interchangeably for different types of input with few changes.'
          }
          extraKeywords="Component, Textarea, Input, Forms"
        >
          <p>
            The textarea component renders a textarea input. It behaves in the
            same way as the Input component, so the two can be used
            interchangeably for different types of input with few changes.
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
