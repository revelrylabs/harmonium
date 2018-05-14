import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  Pluralize: require('raw!../../examples/Pluralize.js.example'),
}

export default class PluralizeExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Pluralize"
          metaDescription={
            'The Pluralize component is a small utility component for implementing ' +
            'the common need to conditional pluralize words based on a quantity.'
          }
          extraKeywords="Component, Pluralize, Inflection"
        >
          <p>
            The Pluralize component is a small utility component for
            implementing the common need to conditional pluralize words based on
            a quantity. For example, consider a page that can contain one or
            more search results and a result count. You could use this component
            to output "0 results", "1 result", or "2 results", depending on the
            result count.
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
