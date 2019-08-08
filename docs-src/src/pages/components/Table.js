import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  'Table : Default (Responsive)': require('raw-loader!../../examples/Table/Table.js.example'),
  'Table : Striped (Responsive)': require('raw-loader!../../examples/Table/TableStriped.js.example'),
  'Table : Horizontal Scroll': require('raw-loader!../../examples/Table/TableHorizontalScroll.js.example'),
}

export default class TableExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Tables"
          metaDescription={
            'Used for tabular data, our Table component consists of ' +
            'semantic table markup and has multiple display variations.'
          }
          extraKeywords="Component, Table"
        >
          <p>Used for tabular data, our Table component consists of semantic table markup and has multiple display variations.</p>
        </Headers>
        <ExampleSection
          examples={examples}
          scope={scope}
        />
      </div>
    )
  }
}
