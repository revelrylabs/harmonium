import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Basic': require('raw!../../examples/Drawer/Basic.js.example'),
  'Scroll': require('raw!../../examples/Drawer/Scroll.js.example'),
  'Collapsible': require('raw!../../examples/Drawer/Collapsible.js.example'),
  'Overlay': require('raw!../../examples/Drawer/Overlay.js.example'),
}

export default class DrawerExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Drawers" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
