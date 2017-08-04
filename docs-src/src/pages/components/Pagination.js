        import React, {Component} from 'react'
        import ExampleSection from '../../ExampleSection'
        import scope from '../../ExampleScope'

        const examples = {
          'Example1': require('raw!../../examples/Pagination/Example1.js.example'),
          'Example2': require('raw!../../examples/Pagination/Example2.js.example'),
          'Example3': require('raw!../../examples/Pagination/Example3.js.example'),
        }

        export default class PaginationExamplePage extends Component {
          render() {
            return <div>
              <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
            </div>
          }
        }
