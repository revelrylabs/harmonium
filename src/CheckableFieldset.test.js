import React from 'react'
import {shallow} from 'enzyme'
import CheckableFieldset from './CheckableFieldset'
import Checkbox from './Checkbox'

describe('CheckableFieldset', () => {
  it('it can render without render', () => {
    shallow(
      <CheckableFieldset label="Poll">
        <Checkbox name="poll" defaultValue="1" label="One" />
        <Checkbox name="poll" defaultValue="2" label="Two" />
        <Checkbox name="poll" defaultValue="3" label="Three" />
      </CheckableFieldset>
    )
  })
  it('can text of three checkboxes', () => {
    const wrapper = mount(
      <CheckableFieldset label="Poll">
        <Checkbox name="poll" defaultValue="1" label="One" className="firstCheckbox" />
        <Checkbox name="poll" defaultValue="2" label="Two" className="secondCheckbox"/>
        <Checkbox name="poll" defaultValue="3" label="Three" className="thirdCheckbox" />
      </CheckableFieldset>
    )
    expect(wrapper.find('.firstCheckbox').exists()).to.equal(true);
    expect(wrapper.find('.firstCheckbox').find('.rev-Checkbox-label').text()).to.equal('One');
    expect(wrapper.find('.secondCheckbox').exists()).to.equal(true);
    expect(wrapper.find('.secondCheckbox').find('.rev-Checkbox-label').text()).to.equal('Two');
    expect(wrapper.find('.thirdCheckbox').exists()).to.equal(true);
    expect(wrapper.find('.thirdCheckbox').find('.rev-Checkbox-label').text()).to.equal('Three');
  })
})
