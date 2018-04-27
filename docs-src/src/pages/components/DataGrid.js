import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  DataGrid: require('raw!../../examples/DataGrid.js.example'),
}

export default class TableExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="DataGrid"
          metaDescription={
            'The DataGrid component mimics a Table, but instead, uses Rows and Cols as its structure.' +
            'It provides an easy way to visualize data with its fixed Header and inline-scrolling. '
          }
          extraKeywords="Component, DataGrid"
        >
          <p>The DataGrid component mimics a Table, but instead, uses Rows and Cols as it's structure. It provides an easy way to visualize data with it's fixed Header and inline-scrolling.
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
