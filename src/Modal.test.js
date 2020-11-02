import React from 'react'
import {shallow} from 'enzyme'
import Modal from './Modal'
import sinon from 'sinon'

describe('Modal', () => {
  it('should render without throwing', () => {
    shallow(
      <Modal>
        <h2>Some Content</h2>
      </Modal>
    )
  })

  it('handles background clicks without onBackgroundClick prop', () => {
    const modal = shallow(
      <Modal isOpen>
        <h2>Some Content</h2>
      </Modal>
    )

    modal.prop('onBackgroundClick')()
    expect(modal.state('isOpen')).to.eq(false)
  })

  it('handles background clicks with onBackgroundClick prop', () => {
    const spy = sinon.spy()
    const modal = shallow(
      <Modal isOpen onBackgroundClick={spy}>
        <h2>Some Content</h2>
      </Modal>
    )

    modal.prop('onBackgroundClick')()

    expect(modal.state('isOpen')).to.eq(false)
    expect(spy.called).to.eq(true)
  })

  it('should default to closed', () => {
    const modal = shallow(
      <Modal>
        <h2>Some Content</h2>
      </Modal>
    )
    expect(modal.state('isOpen')).to.eq(false)
  })
})
