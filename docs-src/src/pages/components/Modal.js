import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  'Stateless': require('raw-loader!../../examples/Modal/Stateless.js.example'),
  'With Background Click': require('raw-loader!../../examples/Modal/WithBackgroundClick.js.example'),
}

export default class ModalExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="playgroundPreview--FakeViewportContainer">
          <Headers
            title="Modal"
            metaDescription={
              'The Modal component is a dialog with a container (or page) ' +
              'covering background. It should be used only in situations when ' +
              'fully interrupting the user flow for with something important is ' +
              'required.'
            }
            extraKeywords="Component, Modal, Dialog"
          >
            <p>
              The Modal component is a dialog with a container (or page) covering
              background. It should be used only in situations when fully
              interrupting the user flow for with something important is required.</p>
            <p><em>You should use other methods for presenting information and
              actions if a full interruption of the user flow is not required.</em>
            </p>
          </Headers>
          <div>
            <ExampleSection
              title="Examples"
              examples={examples}
              depth={1}
              scope={scope}
            />
          </div>
        </div>
      </Layout>
    )
  }
}
