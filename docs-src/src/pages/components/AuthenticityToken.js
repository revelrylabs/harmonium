import React, {Component} from 'react'
import Form from 'harmonium/lib/Form'
import Button from 'harmonium/lib/Button'
import AuthenticityTokenProvider from 'harmonium/lib/AuthenticityTokenProvider'
import ExampleSection from '../../ExampleSection'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  'Authenticity Token Provider': require('raw-loader!../../examples/AuthenticityTokenProvider.js.example'),
}

const scope = {React, Form, Button, AuthenticityTokenProvider}

export default class AuthenticityTokenExamplePage extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div className="rev-Row rev-Row--collapse">
          <Headers
            title="Authenticity Token"
            metaDescription={
              'Authenticity Tokens are used with many web frameworks to prevent ' +
              'CSRF attacks. Harmonium provides a component that simplifies passing ' +
              'CSRF tokens down the hierarchy to forms.'
            }
            extraKeywords="Component, Authenticity Token, CSRF"
          >
            <p>
              Authenticity Tokens are used with many web frameworks to prevent
              CSRF attacks. Harmonium provides a component that simplifies passing
              CSRF tokens down the hierarchy to forms.
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
