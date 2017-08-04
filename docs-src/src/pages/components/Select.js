        import React, {Component} from 'react'
        import ExampleSection from '../../ExampleSection'
        import scope from '../../ExampleScope'

        const examples = {
          'OptionChildrenVsOptionsProp': require('raw!../../examples/Select/OptionChildrenVsOptionsProp.js.example'),
          'MultipleValues': require('raw!../../examples/Select/MultipleValues.js.example'),
          'Stacks': require('raw!../../examples/Select/Stacks.js.example'),
        }

        export default class SelectExamplePage extends Component {
          render() {
            return <div>
              <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
            </div>
          }
        }
