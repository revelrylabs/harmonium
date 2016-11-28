import React, {Component} from 'react'
import Label from './Label'
import {Row, Col} from './grid'

export class Styles extends Component {
  render() {
    return(
      <Row>
        <Col>
          <Label>{'default'}</Label>
          <Label tiny>tiny</Label>
          <Label small>small</Label>
          <Label medium>medium</Label>
          <Label large>large</Label>
        </Col>
        <Col>
          <Label primary>primary</Label>
          <Label secondary>secondary</Label>
          <Label tertiary>tertiary</Label>
        </Col>
        <Col>
          <Label alert>alert</Label>
          <Label warning>warning</Label>
          <Label success>success</Label>
          <Label info>info</Label>
        </Col>
        <Col>
          <Label large alert>large alert</Label>
          <Label large warning>large warning</Label>
          <Label large success>large success</Label>
          <Label large info>large info</Label>
        </Col>
      </Row>
    )
  }
}
