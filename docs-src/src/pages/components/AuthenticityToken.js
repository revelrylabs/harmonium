import React, {Component} from 'react'
import Form from 'awesome-possum/lib/Form'
import Button from 'awesome-possum/lib/Button'
import AuthenticityTokenProvider from 'awesome-possum/lib/AuthenticityTokenProvider'
import ExampleSection from '../../ExampleSection'

const examples = {
  'Authenticity Token Provider': require('raw!../../examples/AuthenticityTokenProvider.js.example'),
}

const scope = {React, Form, Button, AuthenticityTokenProvider}

export default class AuthenticityTokenExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <ExampleSection title="Authenticity Tokens" examples={examples} depth={1}
scope={scope} />
      </div>
    )
  }
}
