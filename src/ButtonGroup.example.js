import React, {Component} from 'react'
import Button from './Button'
import ButtonGroup from './ButtonGroup'

export class Styles extends Component {
  render() {
    return (
      <ButtonGroup>
        <Button medium>one</Button>
        <Button medium>two</Button>
        <Button medium>three</Button>
      </ButtonGroup>
    )
  }
}
