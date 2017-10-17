import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'TopBar : Default (Justifed Content)': require('raw!../../examples/TopBar.js.example'),
  'TopBar : Centered Content': require('raw!../../examples/TopBarCenter.js.example'),
  'TopBar : Left-aligned Content': require('raw!../../examples/TopBarLeft.js.example'),
  'TopBar : Right-aligned Content': require('raw!../../examples/TopBarRight.js.example'),
  'TopBar : TopBarItem : Left-aligned': require('raw!../../examples/TopBarItemLeft.js.example'),
  'TopBar : TopBarItem : Right-aligned': require('raw!../../examples/TopBarItemRight.js.example')
}

export default class TopBarExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="TopBar Examples" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
