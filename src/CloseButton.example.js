import React, {Component} from 'react'
import Callout from './Callout'
import CloseButton from './CloseButton'
import Icon from './Icon'
import {Row, Col} from './grid'

export class Example extends Component {
  render() {
    return(
      <Row>
        <Col>
          <Callout>
            Look at this close button!
            <CloseButton>
              <Icon i="close"/>
            </CloseButton>
          </Callout>
        </Col>
        <Col>
          <Callout>
            Look at this close button!
            <CloseButton aria-label="Close Callout">
              <span>&times;</span>
            </CloseButton>
          </Callout>
        </Col>
      </Row>
    )
  }
}
