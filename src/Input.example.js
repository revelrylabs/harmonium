import React, {Component} from 'react'
import {Row, Col} from './grid'
import Input from './Input'

const ERROR = "This is an error."
const HELP = "This is help text."

export class Simple extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Input placeholder="Not a stack" />
        </Col>
        <Col>
          <Input placeholder="Not a stack, has an error" error />
        </Col>
      </Row>
    )
  }
}

export class Stack extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Input.Stack label="Is a stack" />
        </Col>
        <Col>
          <Input.Stack label="Is a stack, has help text" help={HELP} />
        </Col>
        <Col>
          <Input.Stack label="Is a stack, has an error" error={ERROR} />
        </Col>
        <Col>
          <Input.Stack label="Is a stack, has both" help={HELP} error={ERROR} />
        </Col>
      </Row>
    )
  }
}

export class Misc extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Input type="password" defaultValue="password" error />
        </Col>
        <Col>
          <Input.Stack type="password" defaultValue="password" label="Password" />
        </Col>
        <Col>
          <Input type="file" error />
        </Col>
        <Col>
          <Input.Stack type="file" label="File upload" help="File must be PDF." error="File was not PDF!" />
        </Col>
      </Row>
    )
  }
}
