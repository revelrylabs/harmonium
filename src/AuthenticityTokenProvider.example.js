import React, {Component} from 'react'
import Form from './Form'
import Button from './Button'
import AuthenticityTokenProvider from './AuthenticityTokenProvider'

export class Example extends Component {

  onSubmit = (e) => {
    alert(`name: csrf, value: ${e.currentTarget.elements['csrf'].value}`)
  };

  render() {
    return (
      <AuthenticityTokenProvider name="csrf" value="plz no hackerz">
        <Form onSubmit={this.onSubmit}>
          <Button>Click to see CSRF token</Button>
        </Form>
      </AuthenticityTokenProvider>
    )
  }
}
