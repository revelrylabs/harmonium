import React from 'react'
import Slider from './Slider'
import {shallow} from 'enzyme'

describe('Slider', () => {
  it('should render without throwing', () => {
    expect(() => shallow(<Slider/>)).not.to.throw()
  })
  it('can render slider with initial value and change the value', () => {
    const wrapper = mount(
      <Slider
        min={0}
        max={10}
        step={2}
        initialValue={4}
        name={'Test Slider'}
      />
    )
    expect(wrapper.exists()).to.equal(true)
    wrapper.find('.rev-Slider-range').instance().value = 4;
    wrapper.find('.rev-Slider-range').simulate("change", { target: { value: 8 }}).instance().value = 8;
  })
})
