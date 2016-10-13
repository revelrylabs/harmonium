import React, {Component} from 'react'
import Input from './Input'

export class Example extends Component {
  render() {
    return (
      <div>
        <Input label="Name" />
        <Input label="Name" helpText="this is help text" />
        <Input label="Name" error="error" />
      </div>
    )
  }
}
