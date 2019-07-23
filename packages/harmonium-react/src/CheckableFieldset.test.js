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
})
