import React from 'react'
import {shallow} from 'enzyme'
import CloseButton from './CloseButton'

describe('CloseButton', () => {
  it('should render without throwing', () => {
    shallow(<CloseButton />)
  })
})
