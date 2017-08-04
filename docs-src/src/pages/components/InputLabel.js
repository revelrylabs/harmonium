        import React, {Component} from 'react'
        import ExampleSection from '../../ExampleSection'
        import scope from '../../ExampleScope'

        const examples = {
          'InputLabel': require('raw!../../examples/InputLabel.js.example')
        }

        export default class InputLabelExamplePage extends Component {
          render() {
            return <div>
              <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
            </div>
          }
        }
