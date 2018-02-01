import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Links': require('raw!../../examples/Social/Link.js.example'),
  'With Icons And Buttons': require('raw!../../examples/Social/IconsAndButtons.js.example'),
}

export default class SocialExamplePage extends Component {
  render() {
    return <div className="rev-Row rev-Row--collapsed">
      <ExampleSection title="Social" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
