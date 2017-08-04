        import React, {Component} from 'react'
        import ExampleSection from '../../ExampleSection'
        import scope from '../../ExampleScope'

        const examples = {
          'Select': require('raw!../../examples/Select.js.example')
        }

        export default class SelectExamplePage extends Component {
          render() {
            return <div>
              <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
            </div>
          }
        }
