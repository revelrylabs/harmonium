import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  'DataGrid : Default (Responsive)': require('raw-loader!../../examples/DataGrids/DataGrid.js.example'),
  'DataGrid : Striped': require('raw-loader!../../examples/DataGrids/DataGridStriped.js.example'),
  'DataGrid : Vertical Scroll': require('raw-loader!../../examples/DataGrids/DataGridVerticalScroll.js.example'),
}

export default class DataGridExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Headers
          title="DataGrid"
          metaDescription={
            'The DataGrid component mimics a Table, but instead, uses a float grid with Rows and Cols as its structure.'
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
      </Layout>
    )
  }
}
