import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Basic': require('raw!../../examples/MediaObject/Basic.js.example'),
  'Stack': require('raw!../../examples/MediaObject/Stack.js.example'),
  'SectionAlignment': require('raw!../../examples/MediaObject/SectionAlignment.js.example'),
  'Nested': require('raw!../../examples/MediaObject/Nested.js.example'),
}

export default class MediaObjectExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
