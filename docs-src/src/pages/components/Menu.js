        import React, {Component} from 'react'
        import ExampleSection from '../../ExampleSection'
        import scope from '../../ExampleScope'

        const examples = {
          'Menu': require('raw!../../examples/Menu.js.example')
        }

        export default class MenuExamplePage extends Component {
          render() {
            return <div>
              <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
            </div>
          }
        }
