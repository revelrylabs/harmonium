import React, {Component} from 'react'
import Form from 'revelry-components/lib/Form'
import Button from 'revelry-components/lib/Button'
import AuthenticityTokenProvider from 'revelry-components/lib/AuthenticityTokenProvider'
import ExampleSection from '../../ExampleSection'

const examples = {
  'Authenticity Token Provider': require('raw!../../examples/AuthenticityTokenProvider.js.example'),
}

const scope = {React: React, Form: Form, Button: Button, AuthenticityTokenProvider: AuthenticityTokenProvider}

export default class AuthenticityTokenExamplePage extends Component {
  render() {
    return <div>
      <ExampleSection title="Examples" examples={examples} depth={1} scope={scope} />
    </div>
  }
}
