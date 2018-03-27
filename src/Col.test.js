import React from 'react'
import {shallow} from 'enzyme'
import Col from './Col'

describe('Col', () => {
  it('should render without throwing', () => {
    shallow(<Col />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'columns'
    const testClassName = '__TEST__'

    const childClassName = shallow(<Col className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })

  it('handles column number props', () => {
    const propToClass = {
      small: 'small',
      medium: 'medium',
      large: 'large',
      smallOffset: 'small-offset',
      mediumOffset: 'medium-offset',
      largeOffset: 'large-offset',
      smallPush: 'small-push',
      mediumPush: 'medium-push',
      largePush: 'large-push',
      smallPull: 'small-pull',
      mediumPull: 'medium-pull',
      largePull: 'large-pull',
      smallOrder: 'small-order',
      mediumOrder: 'medium-order',
      largeOrder: 'large-order',
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

    expect(col.prop('className')).to.contain('small-centered')
  })
})
