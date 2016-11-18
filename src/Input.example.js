import React, {Component} from 'react'
import Input from './Input'

export class Example extends Component {
  state = {
    name: ''
  }

  render() {
    return (
      <div>
        <p><em>A regular controlled input</em></p>
        <Input
          id='name'
          label='What is your name?'
          onChange={(e) => this.setState({name: e.target.value})}
          name='name'
          placeholder='Wonder Woman'
          value={this.state.name}
        />
        <hr />

        <p><em>A required uncontrolled input with help text</em></p>
        <Input
          helpText='USD'
          id='netWorth'
          label='What is your net worth?'
          name='netWorth'
          type='number'
          required
        />
        <hr />

        <p><em>An uncontrolled input with errors</em></p>
        <Input
          errors={['name is required']}
          label='What is your name?'
          name='name'
        />
      </div>
    )
  }
}
