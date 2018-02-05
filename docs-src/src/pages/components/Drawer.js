import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Basic': require('raw!../../examples/Drawer/Basic.js.example'),
}

export default class DrawerExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Drawer" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
