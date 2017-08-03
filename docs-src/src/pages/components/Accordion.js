import React, {Component} from 'react'
import Accordion from 'revelry-components/lib/Accordion'
import Callout from 'revelry-components/lib/Callout'
import ExampleSection from '../../ExampleSection'

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

const scope = {React: React, Accordion: Accordion, Callout: Callout}

export default class AccordionExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
