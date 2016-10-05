import React, {Component} from 'react'
import Select from './Select'
import Option from './Option'

export class Example extends Component {
  render() {
    return (
      <Select name="airport" label="Airport">
        <Option value="MSY">Louis Armstrong</Option>
        <Option value="JFK">John F. Kennedy</Option>
      </Select>
    )
  }
}
