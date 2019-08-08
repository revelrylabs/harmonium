import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  Basic: require('raw-loader!../../examples/StatelessDrawer/Basic.js.example'),
}

export default class StatelessDrawerExamplePage extends Component {
  render() {
    return (
      <div>
        <Headers
          title="Stateless Drawer"
          metaDescription={
            'The StatelessDrawer component is a container that can expand and ' +
            'contract as needed. "Stateless" means that the opened or closedness ' +
            'of the component is not managed within its state, but must be ' +
            'determined by the passed props.'
          }
          extraKeywords="Component, Drawer, StatelessDrawer, Expander"
        >
          <p>
            The StatelessDrawer component is a container that can expand and
            contract as needed. "Stateless" means that the opened or closedness
            of the component is not managed within its state, but must be
            determined by the passed props.
          </p>
        </Headers>
        <ExampleSection
          title="Examples"
          examples={examples}
          depth={1}
          scope={scope}
        />
      </div>
    )
  }
}
