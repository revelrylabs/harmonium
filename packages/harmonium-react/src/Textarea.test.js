import React from 'react'
import {shallow} from 'enzyme'
import Textarea from './Textarea'

describe('Textarea', () => {
  it('should render without throwing', () => {
    shallow(<Textarea />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<Textarea className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })
})

describe('Textarea.Stack', () => {
  it('should render without throwing', () => {
    shallow(<Textarea.Stack />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<Textarea.Stack className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })
})
