        import React, {Component} from 'react'
        import ExampleSection from '../../ExampleSection'
        import scope from '../../ExampleScope'

        const examples = {
          'Pagination': require('raw!../../examples/Pagination.js.example')
        }

        export default class PaginationExamplePage extends Component {
          render() {
            return <div>
              <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
            </div>
          }
        }
