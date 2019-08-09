import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  THings: require('raw-loader!../../examples/Visibility.js.example'),
}

export default class VisibilityExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Headers
          title="Visibility"
          metaDescription={
            'Harmonium includes several visibility utility components. These ' +
            'components are used to control the visibility of their children in ' +
            'different situations. For example, contents can be made invisible ' +
            'at specific breakpoints.'
          }
          extraKeywords="Component, Visibility, Utility"
        >
          <p>
            Harmonium includes several visibility utility components. These
            components are used to control the visibility of their children in
            different situations. For example, contents can be made invisible
            at specific breakpoints.
          </p>
        </Headers>
        <ExampleSection
          title="Examples"
          examples={examples}
          depth={1}
          scope={scope}
        />
      </Layout>
    )
  }
}
