import React from 'react'
import {shallow} from 'enzyme'
import CloseButton from './CloseButton'

describe('CloseButton', () => {
  it('should render without throwing', () => {
    shallow(<CloseButton />)
  })
  it('can click close button', () => {
    let count = 0
    const mockCallBack = () => count++
    const button = shallow(<CloseButton onClick={mockCallBack}>Close</CloseButton>)
    expect(count).to.equal(0);
    button.find('button').simulate('click');
    expect(count).to.equal(1);
  })
})
