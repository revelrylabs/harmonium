import React, {Component} from 'react'
import {Row, Col} from './grid'
import Visibility from './Visibility'

export class Example1 extends Component {
  render() {
    return (
      <Row>
        <Col><Visibility showForSmall><span>showForSmall</span></Visibility></Col>
        <Col><Visibility showForSmallOnly><span>showForSmallOnly</span></Visibility></Col>
        <Col><Visibility hideForSmall><span>hideForSmall</span></Visibility></Col>
        <Col><Visibility hideForSmallOnly><span>hideForSmallOnly</span></Visibility></Col>
        <Col><Visibility showForMedium><span>showForMedium</span></Visibility></Col>
        <Col><Visibility showForMediumOnly><span>showForMediumOnly</span></Visibility></Col>
        <Col><Visibility hideForMedium><span>hideForMedium</span></Visibility></Col>
        <Col><Visibility hideForMediumOnly><span>hideForMediumOnly</span></Visibility></Col>
        <Col><Visibility showForLarge><span>showForLarge</span></Visibility></Col>
        <Col><Visibility showForLargeOnly><span>showForLargeOnly</span></Visibility></Col>
        <Col><Visibility hideForLarge><span>hideForLarge</span></Visibility></Col>
        <Col><Visibility hideForLargeOnly><span>hideForLargeOnly</span></Visibility></Col>
      </Row>
    )
  }
}
