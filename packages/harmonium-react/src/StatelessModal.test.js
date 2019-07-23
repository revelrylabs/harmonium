import React from 'react'
import {shallow} from 'enzyme'
import StatelessModal from './StatelessModal'
import sinon from 'sinon'

describe('StatelessModal', () => {
  it('can render without error when closed', () => {
    shallow(
      <StatelessModal>
        <div>Hello</div>
      </StatelessModal>
    )
  })

  it('can render without error when open', () => {
    shallow(
      <StatelessModal isOpen>
        <div>Hello</div>
      </StatelessModal>
    )
  })

  it('handles background clicks', () => {
    const spy = sinon.spy()
    const modal = shallow(
      <StatelessModal isOpen onBackgroundClick={spy}>
        <div>Hello</div>
      </StatelessModal>
    )

    modal.find('.rev-Modal-background').simulate('click')

    expect(spy.called).to.eq(true)
  })
})
