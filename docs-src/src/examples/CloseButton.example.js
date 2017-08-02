import React, {Component} from 'react'
import Callout from 'revelry-components/lib/Callout'
import CloseButton from 'revelry-components/lib/CloseButton'
import Icon from 'revelry-components/lib/Icon'
import {Row, Col} from 'revelry-components/lib/grid'

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
