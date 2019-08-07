import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  Progress: require('raw-loader!../../examples/Progress.js.example'),
}

export default class ProgressExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Progress Bar"
          metaDescription={
            'The Progress component is a progress bar, that indicates percentage' +
            'completion of some activity.'
          }
          extraKeywords="Component, Progress Bar"
        >
          <p>
            The Progress component is a progress bar, that indicates percentage
            completion of some activity. It is not tied to the particular task
            being done. It could be used as a download completion indicator, or
            to indicate a user's progress through a multi-step flow or form.
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
