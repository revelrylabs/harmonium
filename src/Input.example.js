import React, {Component} from 'react'
import {Row, Col} from './grid'
import Input from './Input'

const ERROR = "This is an error."
const HELP = "This is help text."

export class Text extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Input label="Text" />
        </Col>
        <Col>
          <Input label="Has help text" help={HELP} />
        </Col>
        <Col>
          <Input label="Has error" error={ERROR} />
        </Col>
        <Col>
          <Input label="Has both" help={HELP} error={ERROR} />
        </Col>
      </Row>
    )
  }
}

export class Password extends Component {
  render() {
    return <Input type="password" defaultValue="password" label="Password" />
  }
}

export class File extends Component {
  render() {
    return <Input type="file" label="File upload" help="File must be PDF." error="File was not PDF!" />
  }
}
