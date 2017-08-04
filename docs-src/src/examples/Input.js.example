import React, {Component} from 'react'
import {Row, Col} from 'revelry-components/lib/grid'
import Input from 'revelry-components/lib/Input'

const ERROR = "This is an error."
const HELP = "This is help text."

export class Simple extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Input placeholder="Not a stack" />
          </Col>
          <Col>
            <Input placeholder="Has an error" error />
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
            <Input.Stack label="Is a stack" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input.Stack label="Has help text" help={HELP} />
          </Col>
          <Col>
            <Input.Stack label="Has an error" error={ERROR} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input.Stack label="Has both" help={HELP} error={ERROR} />
          </Col>
        </Row>
      </div>
    )
  }
}

export class Misc extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Input type="password" defaultValue="password" error />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input.Stack type="password" defaultValue="password" label="Password" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input type="file" error />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input.Stack type="file" label="File upload" help="File must be PDF." error="File was not PDF!" />
          </Col>
        </Row>
      </div>
    )
  }
}
