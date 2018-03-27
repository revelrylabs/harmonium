import React from 'react'
import {shallow} from 'enzyme'
import InputLabel from './InputLabel'

describe('InputLabel', () => {
  it('can render when there is an error', () => {
    shallow(<InputLabel error="my error" />)
  })

  it('can render when there is not an error', () => {
    shallow(<InputLabel />)
  })
})
