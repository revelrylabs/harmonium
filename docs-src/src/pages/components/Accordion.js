import React, {Component} from 'react'
import Accordion from 'possum/lib/Accordion'
import Callout from 'possum/lib/Callout'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'

const examples = {
  stateless: {
    'With None Active': require('raw!../../examples/Accordion/Stateless/NoneActive.js.example'),
    'With One Active': require('raw!../../examples/Accordion/Stateless/OneActive.js.example'),
    'With Two Active (array form)': require('raw!../../examples/Accordion/Stateless/TwoActiveArray.js.example'),
    'With Two Active (object form)': require('raw!../../examples/Accordion/Stateless/TwoActiveObject.js.example'),
  },
  stateful: {
    'With None defaultActive': require('raw!../../examples/Accordion/Stateful/NoneActive.js.example'),
    'With One defaultActive': require('raw!../../examples/Accordion/Stateful/OneActive.js.example'),
    'Allowing multiple open': require('raw!../../examples/Accordion/Stateful/MultiOpen.js.example'),
  },
}

export default class AccordionExamplePage extends Component {
  render() {
    return <div className="rev-Row rev-Row--collapse">
      <ExampleSection title="Accordions" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
