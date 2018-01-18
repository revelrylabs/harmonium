import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Textarea': require('raw!../../examples/Textarea.js.example')
}

export default class TextareaExamplePage extends Component {
  render() {
    return <div className="rev-Row rev-Row--collapsed">
      <ExampleSection title="Textareas" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
