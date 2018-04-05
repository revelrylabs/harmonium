import React from 'react'
import {shallow} from 'enzyme'
import Callout from './Callout'

describe('Callout', () => {
  it('should render without throwing', () => {
    shallow(<Callout />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'rev-Callout'
    const testClassName = '__TEST__'

    const childClassName = shallow(<Callout className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })

  it('handles type props', () => {
    const callout = shallow(<Callout alert />)

    expect(callout.prop('className')).to.contain('alert')
  })
})
