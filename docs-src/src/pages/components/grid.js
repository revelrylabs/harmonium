import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Intro': require('raw!../../examples/grid/Intro.js.example'),
  'Nesting': require('raw!../../examples/grid/Nesting.js.example'),
  'Offsets': require('raw!../../examples/grid/Offsets.js.example'),
  'Shrink': require('raw!../../examples/grid/Shrink.js.example'),
  'Row Collapse': require('raw!../../examples/grid/RowCollapse.js.example'),
  'Block Grid': require('raw!../../examples/grid/BlockGrids.js.example'),
  'Source Ordering With Flex Grid': require('raw!../../examples/grid/SourceOrderingWithFlexGrid.js.example'),
  'Source Ordering Without Flex Grid': require('raw!../../examples/grid/SourceOrderingWithoutFlexGrid.js.example'),
  'Vertical Alignment On Col': require('raw!../../examples/grid/VerticalAlignmentOnCol.js.example'),
  'Vertical Alignment On Row': require('raw!../../examples/grid/VerticalAlignmentOnRow.js.example'),
  'Incomplete Rows Without Flex Grid': require('raw!../../examples/grid/IncompleteRowsWithoutFlexGrid.js.example'),
  'Horizontal Alignment On Row': require('raw!../../examples/grid/HorizontalAlignmentOnRow.js.example'),
  'Centered Columns': require('raw!../../examples/grid/CenteredColumns.js.example'),
}

export default class gridExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
