import React from 'react'
import {shallow} from 'enzyme'
import InputErrors from './InputErrors'

describe('InputErrors', () => {
  it('can render without children', () => {
    shallow(<InputErrors />)
  })

  it('can render with children', () => {
    shallow(<InputErrors>a child!</InputErrors>)
  })
})
