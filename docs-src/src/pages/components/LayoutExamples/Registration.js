import React, {Component} from 'react'
import ExampleSection from '../../../ExampleSection'
import scope from '../../../ExampleScope'
import Headers from '../../../Headers'
import Layout from '../../../layouts/index.js'

const examples = {
  Basic: require('raw-loader!../../../examples/LayoutExamples/Registration.js.example'),
}

export default class RegistrationExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Headers
          title="Registration Layout Example"
          metaDescription={
            'This is an example of how Harmonium components can be used to create a Registration form.'
          }
          extraKeywords="LogIn"
        >
          <p>
            This is an example of how Harmonium components can be used to create a Registration form. 
          </p>
        </Headers>
        <ExampleSection examples={examples} depth={1} scope={scope} />
      </Layout>
    )
  }
}
