import React, {Component} from 'react'
import {Row, Col} from './grid'

const X = () => <div style={{border: '1px dotted #999'}}>X</div>

export class GridExample extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Row><Col><strong>small</strong></Col></Row>
          <Row>
            <Col small={4}><X /></Col>
            <Col small={4}><X /></Col>
            <Col small={4}><X /></Col>
          </Row>
          <Row>
            <Col small={3}><X /></Col>
            <Col small={4}><X /></Col>
            <Col small={5}><X /></Col>
          </Row>
          <Row><Col><strong>medium</strong></Col></Row>
          <Row>
            <Col medium={4}><X /></Col>
            <Col medium={4}><X /></Col>
            <Col medium={4}><X /></Col>
          </Row>
          <Row>
            <Col medium={3}><X /></Col>
            <Col medium={4}><X /></Col>
            <Col medium={5}><X /></Col>
          </Row>
          <Row><Col><strong>large</strong></Col></Row>
          <Row>
            <Col large={4}><X /></Col>
            <Col large={4}><X /></Col>
            <Col large={4}><X /></Col>
          </Row>
          <Row>
            <Col large={3}><X /></Col>
            <Col large={4}><X /></Col>
            <Col large={5}><X /></Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
