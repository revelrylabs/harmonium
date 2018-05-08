import React, {Component} from 'react'
import Form from 'awesome-possum/lib/Form'
import Button from 'awesome-possum/lib/Button'
import AuthenticityTokenProvider from 'awesome-possum/lib/AuthenticityTokenProvider'
import ExampleSection from '../../ExampleSection'
import Headers from '../../Headers'

const examples = {
  'Authenticity Token Provider': require('raw!../../examples/AuthenticityTokenProvider.js.example'),
}

const scope = {React, Form, Button, AuthenticityTokenProvider}

export default class AuthenticityTokenExamplePage extends Component {
  render() {
    return (
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
    )
  }
}
