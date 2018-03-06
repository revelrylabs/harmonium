import React, { Component } from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Basic': require('raw!../../examples/NewDrawer/Basic.js.example'),
  'Scroll': require('raw!../../examples/NewDrawer/Scroll.js.example'),
  'Overlay': require('raw!../../examples/NewDrawer/Overlay.js.example'),
}

export default class NewDrawerExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="NewDrawers" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
