import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  Callout: require('raw-loader!../../examples/Callout.js.example'),
}

export default class CalloutExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="rev-Row rev-Row--collapse">
          <Headers
            title="Callout"
            metaDescription={
              'A callout is a small message designed to highlight a message to the user.'
            }
            extraKeywords="Component, Buttons, Forms"
          >
            <p>
              A callout is a small message designed to highlight a message to the
              user. Harmonium has a variety of semantic callout components. The type
              of callout you use should be determined by the nature of the message.
              Use primary for informational messages, success for success messages,
              etc.
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
