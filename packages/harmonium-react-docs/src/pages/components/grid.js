import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  "Intro": require('raw!../../examples/grid/Intro.js.example'),
  'Flex Grid': {
    Shrink: require('raw!../../examples/grid/Shrink.js.example'),
    'Source Ordering With Flex Grid': require('raw!../../examples/grid/SourceOrderingWithFlexGrid.js.example'),
    'Vertical Alignment On Col': require('raw!../../examples/grid/VerticalAlignmentOnCol.js.example'),
    'Vertical Alignment On Row': require('raw!../../examples/grid/VerticalAlignmentOnRow.js.example'),
    'Horizontal Alignment On Row': require('raw!../../examples/grid/HorizontalAlignmentOnRow.js.example'),
  },
  'Float Grid': {
    "Nesting": require('raw!../../examples/grid/Nesting.js.example'),
    Offsets: require('raw!../../examples/grid/Offsets.js.example'),
    'Row Collapse': require('raw!../../examples/grid/RowCollapse.js.example'),
    'Block Grid': require('raw!../../examples/grid/BlockGrids.js.example'),
    'Source Ordering With Float Grid': require('raw!../../examples/grid/SourceOrderingWithoutFlexGrid.js.example'),
    'Incomplete Rows With Float Grid': require('raw!../../examples/grid/IncompleteRowsWithoutFlexGrid.js.example'),
    'Centered Columns': require('raw!../../examples/grid/CenteredColumns.js.example'),
  },
}

export default class gridExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Grid"
          metaDescription={
            'Harmonium includes a very flexible grid system that allows you to ' +
            'build any required layout.'
          }
          extraKeywords="Component, Grid, Layout, Rows, Columns"
        >
          <p>
            Note: the examples on this page have been specifically styled to make
            normally invisible grid elements visible. These non-standard styles:
          </p>
          <ul>
            <li>
              Content areas of grid columns have been given backgrounds to
              demonstrate their bounds.
            </li>
            <li>
              The left and right edges of the columns have been marked with a
              dashed line to demonstrate the extent of the grid gutters.
            </li>
            <li>
              Nested grid rows have been given a white outline to demonstrate
              their bounds.
            </li>
          </ul>
        </Headers>
        <ExampleSection examples={examples} depth={1} scope={scope} />
      </div>
    )
  }
}
