import React, {Component} from 'react'
import {Row, Col} from './grid'
import Select from './Select'

// Got tired of writing explicit options for examples that aren't
// demonstrating options specifically.
const OPTIONS = [
  {label: 'North', value: 'N'},
  {label: 'South', value: 'S'},
  {label: 'East', value: 'E'},
  {label: 'West', value: 'W'},
]

export class OptionChildrenVsOptionsProp extends Component {
  render() {
    return (
      <Row>
        <Col>
          <strong>{"Airport with <option> children."}</strong>
          <Select name="airport">
            <option value="MSY">Louis Armstrong</option>
            <option value="JFK">John F. Kennedy</option>
          </Select>
        </Col>
        <Col>
          <strong>"Airport with `options` prop."</strong>
          <Select name="airport" options={[
            {label: 'Louis Armstrong', value: 'MSY'},
            {label: 'John F. Kennedy', value: 'JFK'},
          ]} />
        </Col>
      </Row>
    )
  }
}

export class MultipleValues extends Component {
  render() {
    return (
      <Select options={OPTIONS} defaultValue={['S', 'E']} multiple />
    )
  }
}

export class Stacks extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Select.Stack options={OPTIONS} label="Has help text" help="This is the help text." />
        </Col>
        <Col>
          <Select.Stack options={OPTIONS} label="Has error" error="This is the error." />
        </Col>
        <Col>
          <Select.Stack options={OPTIONS} label="Stacks both help and error" help="This is the help text." error="This is the error." />
        </Col>
      </Row>
    )
  }
}
