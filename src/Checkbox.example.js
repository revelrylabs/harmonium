import React, {Component} from 'react'
import {Row, Col} from './grid'
import Checkbox from './Checkbox'

const OPTIONS = [
  {label: 'North', value: 'N'},
  {label: 'South', value: 'S'},
  {label: 'East disabled', value: 'E', disabled: true},
  {label: 'West', value: 'W'},
]

export class Singular extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Checkbox name="singular" defaultValue="1" label="One" />
        </Col>
        <Col>
          <Checkbox name="singular" defaultValue="3" label="Has error" error />
        </Col>
      </Row>
    )
  }
}

export class Fieldset extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Checkbox.Fieldset name="with_help" options={OPTIONS} label="Has help text" help="This is the help text." />
          </Col>
          <Col>
            <Checkbox.Fieldset name="with_error" options={OPTIONS} label="Has error" error="This is the error." />
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox.Fieldset name="with_both" options={OPTIONS} label="Stacks both help and error" help="This is the help text." error="This is the error." />
          </Col>
        </Row>
      </div>
    )
  }
}
