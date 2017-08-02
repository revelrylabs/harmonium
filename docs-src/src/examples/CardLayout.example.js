import React, {Component} from 'react'
import CardLayout from 'revelry-components/lib/CardLayout'
import TopBar from 'revelry-components/lib/TopBar'
import Button from 'revelry-components/lib/Button'
import ButtonGroup from 'revelry-components/lib/ButtonGroup'
import Lipsum from 'revelry-components/lib/Lipsum'
import {Row, Col} from 'revelry-components/lib/grid'

export class Basics extends Component {

  static defaultHeight = '300px';

  state = {
    height: this.constructor.defaultHeight,
  };

  expand = () => {
    this.setState({height: null})
  };

  contract = () => {
    this.setState({height: this.constructor.defaultHeight})
  };

  render() {
    const {height} = this.state
    return (
      <div>
        <p>
          The Fill will squeeze and scroll when the CardLayout height is constrained.
          When the height is not constrained, it will expand to fit its content.
          Click the Expand and Contract buttons to illustrate the difference.
        </p>
        <CardLayout style={{height, border: '3px solid gray'}}>
          <CardLayout.Bar>
            <Row>
              <Col><strong>CardLayout Header</strong></Col>
              <Col shrink>Today at 2pm</Col>
            </Row>
          </CardLayout.Bar>
          <CardLayout.Bar>
            You can have more than one header.
          </CardLayout.Bar>
          <CardLayout.Fill style={{backgroundColor: '#ff9'}}>
            <p><Lipsum /></p>
            <p><Lipsum p={2} /></p>
          </CardLayout.Fill>
          <CardLayout.Bar>
            CardLayout Footer
          </CardLayout.Bar>
          <CardLayout.Bar>
            <Button onClick={this.expand}>Expand</Button>
            <Button onClick={this.contract}>Contract</Button>
          </CardLayout.Bar>
        </CardLayout>
      </div>
    )
  }
}
