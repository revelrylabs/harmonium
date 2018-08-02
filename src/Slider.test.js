import React from 'react'
import Slider from './Slider'
import {shallow} from 'enzyme'

describe('Slider', () => {
  it('should render without throwing', () => {
    const testClassName = '__TEST__'

    const sliderComp = shallow(<Slider />)

    expect(sliderComp).not.to.throw(testClassName)
  })
})
