import React, {Component, Children} from 'react'
import Accordion from 'harmonium/lib/Accordion'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  stateless: {
    'With None Active': require('raw-loader!../../examples/Accordion/Stateless/NoneActive.js.example'),
    'With One Active': require('raw-loader!../../examples/Accordion/Stateless/OneActive.js.example'),
    'With Two Active (array form)': require('raw-loader!../../examples/Accordion/Stateless/TwoActiveArray.js.example'),
    'With Two Active (object form)': require('raw-loader!../../examples/Accordion/Stateless/TwoActiveObject.js.example'),
  },
  stateful: {
    'With None defaultActive': require('raw-loader!../../examples/Accordion/Stateful/NoneActive.js.example'),
    'With One defaultActive': require('raw-loader!../../examples/Accordion/Stateful/OneActive.js.example'),
    'Allowing multiple open': require('raw-loader!../../examples/Accordion/Stateful/MultiOpen.js.example'),
  },
}

export default class AccordionExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="rev-Row rev-Row--collapse">
          <Headers
            title="Accordions"
            metaDescription={
              'Accordions are components with multiple sections that can be ' +
              'hidden or revealed. In Harmonium, they come in stateful ' +
              '(self-managed) and stateless (parent-managed) types.'
            }
            extraKeywords="Component, Accordion, Expander"
          >
            <p>
              Accordions are components with multiple sections that can be
              hidden or revealed. In Harmonium, they come in stateful
              (self-managed) and stateless (parent-managed) types.
            </p>
            <p>
              With stateless accordions, you must specify which section(s) are open
              using props. With stateful accordions, the interaction is built-in.
            </p>
          </Headers>
          <ExampleSection
            title="Examples"
            examples={examples}
            depth={1}
            scope={scope}
          />
        </div>
      </Layout>
    )
  }
}
