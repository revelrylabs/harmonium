
import React, {Component} from 'react'
import Form from 'possum/lib/Form'
import Button from 'possum/lib/Button'
import AuthenticityTokenProvider from 'possum/lib/AuthenticityTokenProvider'
import ExampleSection from '../../ExampleSection'

const examples = {
  'Authenticity Token Provider': require('raw!../../examples/AuthenticityTokenProvider.js.example'),
}

const scope = {React: React, Form: Form, Button: Button, AuthenticityTokenProvider: AuthenticityTokenProvider}

export default class AuthenticityTokenExamplePage extends Component {
  render() {
    return <div className="rev-Row rev-Row--collapse">
      <ExampleSection title="Authenticity Tokens" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
