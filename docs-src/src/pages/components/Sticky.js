import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Stateless': require('raw!../../examples/Sticky/Stateless.js.example'),
  'Stateful': require('raw!../../examples/Sticky/Stateful.js.example'),
  'With Offset': require('raw!../../examples/Sticky/Offset.js.example'),
  'Stick to Bottom': require('raw!../../examples/Sticky/Bottom.js.example'),
  'Stick to Bottom with Offset': require('raw!../../examples/Sticky/BottomOffset.js.example'),
}

export default class StickyExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Sticky" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
