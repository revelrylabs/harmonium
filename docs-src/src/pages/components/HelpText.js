import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  HelpText: require('raw-loader!../../examples/HelpText.js.example'),
}

export default class HelpTextExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="rev-Row rev-Row--collapse">
          <Headers
            title="Help Text"
            metaDescription={
              'The HelpText component is intended to provide short explanatory ' +
              'text to users. It is often used with form elements, but can also ' +
              'be used in other contexts.'
            }
            extraKeywords="Component, Help Text, Forms"
          >
            <p>
              The HelpText component is intended to provide short explanatory text
              to users. It is often used with form elements, but can also be used
              in other contexts.
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
