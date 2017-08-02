import React, {Component} from 'react'
import Accordion from 'revelry-components/lib/Accordion'
import Callout from 'revelry-components/lib/Callout'
import Playground from 'component-playground'

const examples = {
  stateless: {
    noneActive: require('raw!../../examples/Accordion/Stateless/NoneActive.js.example'),
    oneActive: require('raw!../../examples/Accordion/Stateless/OneActive.js.example'),
  },
  stateful: {

  },
}

export default class AccordionExamplePage extends Component {
  render() {
    return <div>
      <h1>Examples</h1>
      <Playground docClass={Accordion.Stateful} codeText={examples.stateless.noneActive} scope={{React: React, Accordion: Accordion, Callout: Callout}} />
      <Playground codeText={examples.stateless.oneActive} scope={{React: React, Accordion: Accordion, Callout: Callout}} />
    </div>
  }
}
