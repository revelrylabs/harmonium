import React, {Component} from 'react'
import HelpText from './HelpText'

export class Example1 extends Component {

  render() {
    return (
      <HelpText>Help text with plain text</HelpText>
    )
  }
}

export class Example2 extends Component {

  render() {
    return (
      <HelpText><p>Help text with <strong>children</strong></p></HelpText>
    )
  }
}
