import React from 'react'
import {shallow} from 'enzyme'
import Input from './Input'
import InputGroup from './InputGroup'

describe('InputGroup', () => {
  it('renders without error', () => {
    shallow(
      <InputGroup.Stack
        label="InputGroupTest"
        help="The help text for it"
        error="The error message"
      >
        <InputGroup.Label>$USD</InputGroup.Label>
        <InputGroup.Field>
          <Input type="number" defaultValue={100.0} error="The error message" />
        </InputGroup.Field>
      </InputGroup.Stack>
    )
  })
  it('can render errors and helper text', () => {
    const wrapper = mount(
      <InputGroup.Stack
        label="InputGroupTest"
        help="The help text for it"
        error="The error message"
      >
        <InputGroup.Label>$USD</InputGroup.Label>
        <InputGroup.Field>
          <Input type="number" defaultValue={100.0} error="The error message" />
        </InputGroup.Field>
      </InputGroup.Stack>
    )
    expect(wrapper.find('InputErrors').exists()).to.equal(true);
    expect(wrapper.find('InputErrors').text()).to.equal('The error message');
    expect(wrapper.find('InputHelpText').exists()).to.equal(true);
    expect(wrapper.find('InputHelpText').text()).to.equal('The help text for it');
  })
})
