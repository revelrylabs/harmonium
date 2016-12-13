import React from 'react'
import {Row, Col} from './grid'
import Callout from './Callout'

export class Example extends React.Component {

  render() {
    return (
      <div>
        <Row>
          <Col><Callout>default</Callout></Col>
        </Row>
        <Row>
          <Col><Callout primary>primary</Callout></Col>
        </Row>
        <Row>
          <Col><Callout secondary>secondary</Callout></Col>
        </Row>
        <Row>
          <Col><Callout success>success</Callout></Col>
        </Row>
        <Row>
          <Col><Callout warning>warning</Callout></Col>
        </Row>
        <Row>
          <Col><Callout alert>alert</Callout></Col>
        </Row>
      </div>
    )
  }
}
