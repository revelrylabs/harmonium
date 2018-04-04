import React from 'react'
import {shallow, mount} from 'enzyme'
import Tabs from './Tabs'
import sinon from 'sinon'

describe('Tabs', () => {
  it('should render without throwing', () => {
    shallow(
      <Tabs>
        <Tabs.Item contentKey={1} title="One" />
      </Tabs>
    )
  })

  it('should add className to child', () => {
    const inherentClassName = 'rev-Tabs'
    const testClassName = '__TEST__'

    const childClassName = shallow(
      <Tabs className={testClassName}>
        <Tabs.Item contentKey={1} title="One" />
      </Tabs>
    )
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })
})

describe('StatefulTabs', () => {
  it('should render without throwing (default active case)', () => {
    mount(
      <Tabs.Stateful defaultActive={1}>
        <Tabs.Item contentKey={1} title="One" renderTitle />
      </Tabs.Stateful>
    )
  })

  it('should render without throwing (wihtout default active case)', () => {
    mount(
      <Tabs.Stateful>
        <Tabs.Item contentKey={1} title="One" renderTitle />
      </Tabs.Stateful>
    )
  })

  it('should handle clicks on child components', () => {
    const spy = sinon.spy()
    const stateful = shallow(
      <Tabs.Stateful defaultActive={1}>
        <div
          className="StatefulTabExample"
          role="button"
          onClick={spy}
          onKeyPress={spy}
          tabIndex={0}
        />
      </Tabs.Stateful>
    )

    stateful
      .find('.StatefulTabExample')
      .simulate('click', {preventDefault: () => {}})

    expect(spy.called).to.eq(true)
  })
})

describe('Tabs.Item', () => {
  it('can render without error (title case)', () => {
    mount(<Tabs.Item contentKey={1} title="One" renderTitle />)
  })
})

describe('Tabs.Panel', () => {
  it('can render without error (panel case, active)', () => {
    mount(<Tabs.Item contentKey={1} title="One" active />)
  })

  it('can render without error (panel case, inactive)', () => {
    mount(<Tabs.Item contentKey={1} title="One" />)
  })
})
