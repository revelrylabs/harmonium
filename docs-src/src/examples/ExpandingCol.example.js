import React, {Component} from 'react'
import {ExpandingColStateContainer, ExpandingCol} from 'revelry-components/lib/ExpandingCol'
import Callout from 'revelry-components/lib/Callout'
import {Row, Col} from 'revelry-components/lib/grid'

export class DefaultStateful extends Component {
  render() {
    return (
      <Row>
        <ExpandingColStateContainer small={3}>
          <Callout primary>
            This state will be shown or hidden with the buttons.
          </Callout>
        </ExpandingColStateContainer>
        <Col small={9}>
          This is outside the expander.
        </Col>
      </Row>
    )
  }
}

export class DefaultStateless extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  // Don't do toggle methods in real life, Joel will be sad
  toggleOpen = () => this.setState({open: !this.state.open})

  render() {
    let state = this.state || {open: false}
    return (
      <Row>
        <ExpandingCol small={3} open={state.open}>
          <Callout primary>
            You did it!
          </Callout>
        </ExpandingCol>
        <Col small={9} onClick={this.toggleOpen}>
          Click me!
        </Col>
      </Row>
    )
  }
}
