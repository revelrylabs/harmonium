import React, {Component} from 'react'
import {Row, Col} from './grid'
import Radio from './Radio'

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
      <div>
        <Row>
          <Col>
            <Radio.Fieldset name="fieldset_help" options={OPTIONS} label="Has help text" help="This is the help text." />
          </Col>
          <Col>
            <Radio.Fieldset name="fieldset_error" options={OPTIONS} label="Has error" error="This is the error." />
          </Col>
        </Row>
        <Row>
          <Col>
            <Radio.Fieldset name="fieldset_both" options={OPTIONS} label="Stacks both help and error" help="This is the help text." error="This is the error." />
          </Col>
        </Row>
      </div>
    )
  }
}
