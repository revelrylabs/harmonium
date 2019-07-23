import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  TextAlign: require('raw!../../examples/TextAlign.js.example'),
}

export default class TextAlignExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Text Align"
          metaDescription={
            'The Text Align component is a utility component for aligning text ' +
            'to the left, center, right, or full justification. It can also align ' +
            'text differently at different breakpoints.'
          }
          extraKeywords="Component, Alignment, Utilities Layout"
        >
          <p>
            The Text Align component is a utility component for aligning text
            to the left, center, right, or full justification. It can also align
            text differently at different breakpoints.
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
