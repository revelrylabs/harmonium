import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  Flash: require('raw-loader!../../examples/Flash.js.example'),
}

export default class FlashExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="rev-Row rev-Row--collapse">
          <Headers
            title="Flash"
            metaDescription={
              'A Flash is a small message designed to highlight a message to the user.'
            }
            extraKeywords="Component, Buttons, Forms"
          >
            <p>
              A Flash is a small message designed to highlight a message to the
              user. Harmonium has a variety of semantic Flash components. The
              type of Flash you use should be determined by the nature of the
              message. Use primary for informational messages, success for
              success messages, etc.
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
