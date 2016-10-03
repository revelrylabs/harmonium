import React from 'react'
import {Row, Col} from './grid'
import Callout from './Callout'
import Lipsum from './Lipsum'

export class Example extends React.Component {

  render() {
    return (
      <Row>
        <Col><Callout><Lipsum /></Callout></Col>
        <Col><Callout secondary><Lipsum /></Callout></Col>
        <Col><Callout primary><Lipsum /></Callout></Col>
        <Col><Callout success><Lipsum /></Callout></Col>
        <Col><Callout warning><Lipsum /></Callout></Col>
        <Col><Callout alert><Lipsum /></Callout></Col>
      </Row>
    )
  }
}
