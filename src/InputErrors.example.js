import React, {Component} from 'react'
import InputErrors from './InputErrors'

export class Example extends Component {

  render() {
    return (
      <div>
        <p>Example with no errors:</p>
        <InputErrors />

        <p>Example with errors:</p>
        <InputErrors errors={['field is required']} />
      </div>
    )
  }
}
