import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  Emptyable: require('raw!../../examples/Emptyable.js.example'),
}

export default class EmptyableExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <Headers
          title="Emptyable"
          metaDescription={
            'An Emptyable is an item can contains optional / varying children, ' +
            'and should show an empty state if there are no children.'
          }
          extraKeywords="Component, Empty State, Emptyable"
        >
          <p>
            An Emptyable is an item can contains optional / varying children,
            and should show an empty state if there are no children. It is
            recommended that tables and lists which can vary in length and have
            zero children at times have a specified empty state for user experience
            reasons.
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
