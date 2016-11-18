import React, {Component} from 'react'
import InputHelpText from './InputHelpText'

export class Example extends Component {

  render() {
    return (
      <div>
        <p>
          Example with no help text (it returns null when empty so nothing is there!):
        </p>
        <InputHelpText />

        <hr />

        <p>Example with help text as a string:</p>
        <InputHelpText>I am some very helpful text.'</InputHelpText>

        <hr />

        <p>Example with help text as children:</p>
        <InputHelpText>
          <p>I am some <strong>very</strong> helpful text.</p>
        </InputHelpText>
      </div>
    )
  }
}
