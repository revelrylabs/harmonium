import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'FlexVideo': require('raw!../../examples/FlexVideo.js.example')
}

export default class FlexVideoExamplePage extends Component {
  render() {
    return <div className="rev-Row rev-Row--collapse">
      <ExampleSection title="Flex Video" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
