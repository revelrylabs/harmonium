import React from 'react'
import {shallow} from 'enzyme'
import Select from './Select'

describe('Select', () => {
  it('should render without throwing', () => {
    shallow(<Select />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<Select className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })

  it('handles options', () => {
    const OPTIONS = [
      {label: 'North', value: 'N'},
      {label: 'South', value: 'S'},
      {label: 'East', value: 'E'},
      {label: 'West', value: 'W'},
    ]

    const select = shallow(<Select options={OPTIONS} />)

    expect(select.children()).to.have.length(OPTIONS.length)
  })
})

describe('Select.Stack', () => {
  it('should render without throwing', () => {
    shallow(<Select.Stack />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<Select.Stack className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })
})
