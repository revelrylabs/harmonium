import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  'Stateless': require('raw!../../examples/Modal/Stateless.js.example'),
  'With Background Click': require('raw!../../examples/Modal/WithBackgroundClick.js.example'),
}

export default class ModalExamplePage extends Component {
  render() {
    return <div className="playgroundPreview--FakeViewportContainer">
      <div className="rev-Row rev-Row--collapsed">
        <ExampleSection title="Modals" examples={examples} depth={1} scope={scope} />
      </div>
    </div>
  }
}
