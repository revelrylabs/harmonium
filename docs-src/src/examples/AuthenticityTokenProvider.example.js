import React, {Component} from 'react'
import Form from 'revelry-components/lib/Form'
import Button from 'revelry-components/lib/Button'
import AuthenticityTokenProvider from 'revelry-components/lib/AuthenticityTokenProvider'

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
