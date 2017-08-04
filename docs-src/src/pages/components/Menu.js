        import React, {Component} from 'react'
        import ExampleSection from '../../ExampleSection'
        import scope from '../../ExampleScope'

        const examples = {
          'Basic': require('raw!../../examples/Menu/Basic.js.example'),
          'Simple': require('raw!../../examples/Menu/Simple.js.example'),
          'Text': require('raw!../../examples/Menu/Text.js.example'),
          'Vertical': require('raw!../../examples/Menu/Vertical.js.example'),
          'Centered': require('raw!../../examples/Menu/Centered.js.example'),
          'RightAlignment': require('raw!../../examples/Menu/RightAlignment.js.example'),
          'ActiveState': require('raw!../../examples/Menu/ActiveState.js.example'),
          'IconsOnTop': require('raw!../../examples/Menu/IconsOnTop.js.example'),
          'Nested': require('raw!../../examples/Menu/Nested.js.example'),
        }

        export default class MenuExamplePage extends Component {
          render() {
            return <div>
              <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
            </div>
          }
        }
