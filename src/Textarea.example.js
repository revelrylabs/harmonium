import React, {Component} from 'react'
import {Row, Col} from './grid'
import Textarea from './Textarea'

const ERROR = "This is an error."
const HELP = "This is help text."

export class Simple extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Textarea placeholder="Not a stack" />
          </Col>
          <Col>
            <Textarea placeholder="Has an error" error />
          </Col>
        </Row>
      </div>
    )
  }
}

export class Stack extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Textarea.Stack label="Is a stack" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Textarea.Stack label="Has help text" help={HELP} />
          </Col>
          <Col>
            <Textarea.Stack label="Has an error" error={ERROR} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Textarea.Stack label="Has both" help={HELP} error={ERROR} />
          </Col>
        </Row>
      </div>
    )
  }
}
