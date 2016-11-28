import React, {Component} from 'react'
import {Row, Col} from './grid'
import Radio from './Radio'

const OPTIONS = [
  {label: 'North', value: 'N'},
  {label: 'South', value: 'S'},
  {label: 'East', value: 'E'},
  {label: 'West', value: 'W'},
]

export class Singular extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Radio name="singular" defaultValue="1" label="One" />
        </Col>
        <Col>
          <Radio name="singular" defaultValue="3" label="Has error" error />
        </Col>
      </Row>
    )
  }
}

export class Fieldset extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Radio.Fieldset options={OPTIONS} label="Has help text" help="This is the help text." />
        </Col>
        <Col>
          <Radio.Fieldset options={OPTIONS} label="Has error" error="This is the error." />
        </Col>
        <Col>
          <Radio.Fieldset options={OPTIONS} label="Stacks both help and error" help="This is the help text." error="This is the error." />
        </Col>
      </Row>
    )
  }
}
