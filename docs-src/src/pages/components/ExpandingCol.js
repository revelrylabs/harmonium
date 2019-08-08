import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  Stateful: require('raw-loader!../../examples/ExpandingCol/Stateful.js.example'),
  Stateless: require('raw-loader!../../examples/ExpandingCol/Stateless.js.example'),
}

export default class ExpandingColExamplePage extends Component {
  render() {
    return (
      <div className="Columns">
        <Headers
          title="Expanding Column"
          metaDescription={
            'An ExpandingCol is a column that can expand or collapse ' +
            'when a user interacts with an Expander button.'
          }
          extraKeywords="Component, Expander, Grid"
        >
          <p>
            An ExpandingCol is a column that can expand or collapse when a user
            interacts with an Expander button. It is similar to an expanding
            drawer component, but may be better in situations where it is
            directly alongside other grid column components.
          </p>
        </Headers>
        <ExampleSection
          title="Expanding Columns"
          examples={examples}
          depth={1}
          scope={scope}
        />
      </div>
    )
  }
}
