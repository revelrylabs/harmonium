import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'FileInput': require('raw!../../examples/FileInput.js.example')
}

export default class FileInputExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
