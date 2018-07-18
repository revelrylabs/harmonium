import React from 'react'
import {shallow, mount} from 'enzyme'
import Slider from './Slider'

describe('Slider', () => {
  it('should render without throwing', () => {
    shallow(<Slider />)
  })
})
