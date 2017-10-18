import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'TopBar : Default (Justifed Content)': require('raw!../../examples/TopBar/TopBar.js.example'),
  'TopBar : Centered Content': require('raw!../../examples/TopBar/TopBarCenter.js.example'),
  'TopBar : Left-aligned Content': require('raw!../../examples/TopBar/TopBarLeft.js.example'),
  'TopBar : Right-aligned Content': require('raw!../../examples/TopBar/TopBarRight.js.example'),
}

export default class TopBarExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="TopBar Examples" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
