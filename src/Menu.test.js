import React from 'react'
import {shallow} from 'enzyme'
import Menu from './Menu'

describe('Menu', () => {
  it('should render without throwing', () => {
    shallow(<Menu />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<Menu className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })
})

describe('Menu.Item', () => {
  it('should render without throwing', () => {
    shallow(<Menu />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<Menu.Item className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })
})
