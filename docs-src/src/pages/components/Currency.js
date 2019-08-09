import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  Currency: require('raw-loader!../../examples/Currency.js.example'),
}

export default class CurrencyExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="rev-Row rev-Row--collapse">
          <Headers
            title="Currency"
            metaDescription={
              'The currency component is a component that formats an amount as currency ' +
              'based on a given locale. Default is $USD format.'
            }
            extraKeywords="Component, Currency, Localization"
          >
            <p>
              The currency component is a component that formats an amount as
              currency based on a given locale. Default is $USD format.
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
