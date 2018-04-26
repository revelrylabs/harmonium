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
            'The Table component can be built out in two ways: ' +
            '1. A table component that actually uses the <table> tags. ' +
            '2. A table component that mimics a table, but uses Rows and Cols (or listed items). ' +
            'Both are shown below. '
          }
          extraKeywords="Component, Table"
        >
          <p>
            The Table component can be built out in two ways:<br />
            1. A table component that actually uses the table tags.<br />
            2. A table component that mimics a table, but uses Rows and Cols (or listed items).<br />
            Both are shown below.
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
