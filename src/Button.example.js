import React, {Component} from 'react'
import Button from './Button'
import {Row, Col} from './grid'

export class Styles extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Button>{'default'}</Button>
          <Button tiny>tiny</Button>
          <Button small>small</Button>
          <Button medium>medium</Button>
          <Button large>large</Button>
        </Col>
        <Col>
          <Button disabled>disabled</Button>
          <Button alert>alert</Button>
          <Button alert disabled>alert disabled</Button>
          <Button secondary>secondary</Button>
          <Button secondary disabled>secondary disabled</Button>
          <Button success>success</Button>
          <Button success disabled>success disabled</Button>
        </Col>
        <Col>
          <Button disabled hollow>disabled hollow</Button>
          <Button alert hollow>alert hollow</Button>
          <Button alert disabled hollow>alert disabled hollow</Button>
          <Button secondary hollow>secondary hollow</Button>
          <Button secondary disabled hollow>secondary disabled hollow</Button>
          <Button success hollow>success hollow</Button>
          <Button success disabled hollow>success disabled hollow</Button>
        </Col>
        <Col>
          <Button expanded>expanded</Button>
          <Button expanded tiny>expanded tiny</Button>
          <Button expanded small>expanded small</Button>
          <Button expanded medium>expanded medium</Button>
          <Button expanded large>expanded large</Button>
        </Col>
      </Row>
    )
  }
}
