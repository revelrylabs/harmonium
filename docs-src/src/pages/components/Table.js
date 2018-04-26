import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  Table: require('raw!../../examples/Table.js.example'),
}

export default class TableExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Tables"
          metaDescription={
            'The Table component can be built out using the <table> tags. ' +
            'This shows the basic structure of a table, and more will be added in the future. '
          }
          extraKeywords="Component, Table"
        >
          <p>The Table component can be built out using the table tags. This shows the basic structure of a table, and more will be added in the future.
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
