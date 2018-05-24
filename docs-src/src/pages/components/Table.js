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
          title="Table"
          metaDescription={
            'The Table component can be built out using the <table> tags. ' +
            'Stripes can be added by using the `rev-Table--striped` className. ' +
            'Row styles such as Stripes help the user visualize data. '
          }
          extraKeywords="Component, Table"
        >
          <p>The Table component can be built out using the table tags. This shows the basic structure of a table. Stripes can be added by using the `rev-Table--striped` className. Row styles such as Stripes help the user visualize data.
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
