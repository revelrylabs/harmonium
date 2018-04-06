import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  Lipsum: require('raw!../../examples/Lipsum.js.example'),
}

export default class LipsumExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Lipsum"
          metaDescription={
            'The Lipsum component provides one of more paragraphs of text for ' +
            'purposes of testing a design before final content is available.'
          }
          extraKeywords="Component, Lorem Ipsum, Lipsum, Placeholder"
        >
          <p>
            The Lipsum component provides one of more paragraphs of text for
            purposes of testing a design before final content is available.
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
