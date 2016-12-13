import React, {Component} from 'react'
import Button from './Button'
import ButtonGroup from './ButtonGroup'

export class Styles extends Component {
  render() {
    return (
      <ButtonGroup>
        <Button>one</Button>
        <Button secondary>two</Button>
        <Button success>three</Button>
      </ButtonGroup>
    )
  }
}
