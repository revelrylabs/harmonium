import React, {Component} from 'react'
import Button from 'revelry-components/lib/Button'
import ButtonGroup from 'revelry-components/lib/ButtonGroup'

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
