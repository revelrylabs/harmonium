        import React, {Component} from 'react'
        import ExampleSection from '../../ExampleSection'
        import scope from '../../ExampleScope'

        const examples = {
          'Basic': require('raw!../../examples/Input/Basic.js.example'),
          'Stack': require('raw!../../examples/Input/Stack.js.example'),
          'Misc': require('raw!../../examples/Input/Misc.js.example'),
        }

        export default class InputExamplePage extends Component {
          render() {
            return <div>
              <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
            </div>
          }
        }
