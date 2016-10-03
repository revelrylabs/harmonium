import React, {Component} from 'react'
import {Row, Col} from './grid'

export class GridExample extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Row>
            <Col small={4}>4</Col>
            <Col small={4}>4</Col>
            <Col small={4}>4</Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
