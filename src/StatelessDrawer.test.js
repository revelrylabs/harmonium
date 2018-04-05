import React from 'react'
import {shallow, mount} from 'enzyme'
import StatelessDrawer, {Expander} from './StatelessDrawer'
import sinon from 'sinon'

describe('StatelessDrawer', () => {
  it('should render', () => {
    shallow(<StatelessDrawer />)
  })

  it('can handle boolean props', () => {
    const expander = shallow(<StatelessDrawer left />).find(Expander)

    expect(expander.prop('className')).to.contain('rev-Drawer--left')
  })

  it('handles close clicks', () => {
    const spy = sinon.spy()
    const drawer = mount(<StatelessDrawer open close={spy} />)

    drawer.find('.rev-Drawer-closer').simulate('click')

    expect(spy.called).to.eq(true)
  })

  it('handles expand clicks', () => {
    const spy = sinon.spy()
    const drawer = mount(<StatelessDrawer expand={spy} />)

    drawer.find('.rev-Drawer-expander').simulate('click')

    expect(spy.called).to.eq(true)
  })

  it('can expand and collapse', () => {
    const drawer = mount(<StatelessDrawer left />)
    const expander = drawer.find(Expander)

    expect(expander.find('.rev-Drawer').prop('className')).to.not.contain(
      'rev-Drawer--open'
    )

    drawer.setProps({open: true})
    drawer.update()

    expect(drawer.find('.rev-Drawer').prop('className')).to.contain(
      'rev-Drawer--open'
    )

    drawer.setProps({open: false})
    drawer.update()

    expect(expander.find('.rev-Drawer').prop('className')).to.not.contain(
      'rev-Drawer--open'
    )
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const input = shallow(<StatelessDrawer className={testClassName} />).find(
      `.${testClassName}`
    )

    expect(input.exists()).to.equal(true)
  })
})
