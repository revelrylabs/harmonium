import React, {Component} from 'react'
import Button from './Button'
import ButtonBar from './ButtonBar'

export class Styles extends Component {
  render() {
    return (
      <ButtonBar>
        <Button medium>one</Button>
        <Button medium>two</Button>
        <Button medium>three</Button>
      </ButtonBar>
    )
  }
}
