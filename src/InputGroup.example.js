import React, {Component} from 'react'
import {Row, Col} from './grid'
import InputGroup from './InputGroup'
import Input from './Input'
import Button from './Button'

const ERROR = "This is an error."
const HELP = "This is help text."

export class Standalone extends Component {
  render() {
    return (
      <InputGroup>
        <InputGroup.Label>$</InputGroup.Label>
        <InputGroup.Field>
          <Input type="number" defaultValue={100} />
        </InputGroup.Field>
        <InputGroup.Button>
          <Button secondary>Cancel</Button>
        </InputGroup.Button>
        <InputGroup.Button>
          <Button primary>Save</Button>
        </InputGroup.Button>
      </InputGroup>
    )
  }
}

export class Stack extends Component {
  render() {
    const label = 'I like money.'
    const help = 'You should get some money.'
    const error = 'Not enough money!!!'

    return (
      <InputGroup.Stack label={label} help={help} error={error}>
        <InputGroup.Label>
          $USD
        </InputGroup.Label>
        <InputGroup.Field>
          <Input type="number" defaultValue={100.00} error={error} />
        </InputGroup.Field>
      </InputGroup.Stack>
    )
  }
}
