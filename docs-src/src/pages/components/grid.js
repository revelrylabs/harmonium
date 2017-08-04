        import React, {Component} from 'react'
        import ExampleSection from '../../ExampleSection'
        import scope from '../../ExampleScope'

        const examples = {
          'Intro': require('raw!../../examples/grid/Intro.js.example'),
          'Nesting': require('raw!../../examples/grid/Nesting.js.example'),
          'Offsets': require('raw!../../examples/grid/Offsets.js.example'),
          'Shrink': require('raw!../../examples/grid/Shrink.js.example'),
          'RowCollapse': require('raw!../../examples/grid/RowCollapse.js.example'),
          'BlockGrid': require('raw!../../examples/grid/BlockGrids.js.example'),
          'SourceOrderingWithFlexGrid': require('raw!../../examples/grid/SourceOrderingWithFlexGrid.js.example'),
          'SourceOrderingWithoutFlexGrid': require('raw!../../examples/grid/SourceOrderingWithoutFlexGrid.js.example'),
          'VerticalAlignmentOnCol': require('raw!../../examples/grid/VerticalAlignmentOnCol.js.example'),
          'VerticalAlignmentOnRow': require('raw!../../examples/grid/VerticalAlignmentOnRow.js.example'),
          'IncompleteRowsWithoutFlexGrid': require('raw!../../examples/grid/IncompleteRowsWithoutFlexGrid.js.example'),
          'HorizontalAlignmentOnRow': require('raw!../../examples/grid/HorizontalAlignmentOnRow.js.example'),
          'CenteredColumns': require('raw!../../examples/grid/CenteredColumns.js.example'),
        }

        export default class gridExamplePage extends Component {
          render() {
            return <div>
              <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
            </div>
          }
        }
