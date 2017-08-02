import React, {Component} from 'react'
import {Row, Col} from 'revelry-components/lib/grid'
import FileInput from 'revelry-components/lib/FileInput'
import Icon from 'revelry-components/lib/Icon'

export class Basic extends Component {
  render() {
    return (
      <div>
        <Row largeUnstack>
          <Col small={12}><FileInput /></Col>
          <Col small={12}><FileInput button={<Icon i="upload" />} /></Col>
          <Col small={12}>
            <FileInput placeholder="placeholder + error" error />
          </Col>
        </Row>
      </div>
    )
  }
}

export class Stack extends Component {
  render() {
    return (
      <Row largeUnstack>
        <Col small={12}>
          <FileInput.Stack
            label="This is the label."
            help="This is help text."
            placeholder="The placeholder passes through."
            button="Yay!"
          />
        </Col>
        <Col small={12}>
        <FileInput.Stack
          label="This is the label."
          help="This is help text."
          error="This is an error."
          placeholder="The placeholder passes through."
          button="Yay!"
        />
        </Col>
      </Row>
    )
  }
}
