import React from 'react'
import {shallow} from 'enzyme'
import Col from './Col'

describe('Col', () => {
  it('should render without throwing', () => {
    shallow(<Col />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'rev-Col'
    const testClassName = '__TEST__'

    const childClassName = shallow(<Col className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })

  it('handles column number props', () => {
    const propToClass = {
      small: 'rev-Col--small',
      medium: 'rev-Col--medium',
      large: 'rev-Col--large',
      smallOffset: 'rev-Col--smallOffset',
      mediumOffset: ' rev-Col--mediumOffset',
      largeOffset: 'rev-Col--largeOffset',
      smallPush: 'rev-Col--smallPush',
      mediumPush: 'rev-Col--mediumPush',
      largePush: 'rev-Col--largePush',
      smallPull: 'rev-Col--smallPull',
      mediumPull: 'rev-Col--mediumPull',
      largePull: 'rev-Col--largePull',
      smallOrder: 'rev-Col--smallOrder',
      mediumOrder: 'rev-Col--mediumOrder',
      largeOrder: 'rev-Col--largeOrder',
    }

    for (const key in propToClass) {
      if (Object.prototype.hasOwnProperty.call(propToClass, key)) {
        const value = propToClass[key]
        const props = {[key]: 1}
        const col = shallow(<Col {...props} />)

        expect(col.prop('className')).to.contain(value)
      }
    }
  })

  it('handles boolean props', () => {
    const col = shallow(<Col smallCentered />)

    expect(col.prop('className')).to.contain('rev-Col--smallCentered')
  })
})
