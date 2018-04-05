import React from 'react'
import {shallow} from 'enzyme'
import Form from './Form'

describe('Form', () => {
  it('should render without throwing', () => {
    shallow(<Form />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<Form className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })
})
