import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'THings': require('raw!../../examples/Visibility.js.example')
}

export default class VisibilityExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Visibility" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
