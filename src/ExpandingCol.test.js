import 'jsdom-global/register'
import React from 'react'
import {shallow, mount} from 'enzyme'
import {ExpandingCol, ExpandingColStateContainer} from './ExpandingCol'

describe('ExpandingCol', () => {
  it('should render closed with is-closed', () => {
    const classes = shallow(<ExpandingCol>Test</ExpandingCol>)
      .first()
      .prop('className')

    expect(classes).to.contain('is-closed')
  })

  it('should render open with is-open', () => {
    const classes = shallow(<ExpandingCol open>Test</ExpandingCol>)
      .first()
      .prop('className')

    expect(classes).to.contain('is-open')
  })
})

describe('ExpandingColStateContainer', () => {
  it('should render without throwing', () => {
    shallow(<ExpandingColStateContainer>Test</ExpandingColStateContainer>)
  })

  it('should be openable and closeable', () => {
    const container = mount(
      <ExpandingColStateContainer>Test</ExpandingColStateContainer>
    )
    const expander = container.find('.rev-ExpandingCol-expander').first()

    expander.simulate('click')

    expect(container.state('open')).to.eq(true)

    expander.simulate('click')

    expect(container.state('open')).to.eq(false)
  })
})
