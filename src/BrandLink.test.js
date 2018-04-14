import React from 'react'
import {shallow} from 'enzyme'
import BrandLink from './BrandLink'

describe('BrandLink', () => {
  it('should render without throwing', () => {
    shallow(<BrandLink />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'rev-BrandLink'
    const testClassName = '__TEST__'

    const childClassName = shallow(<BrandLink className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })

  it('should handle props for different BrandLink types', () => {
    const BrandLink = shallow(<BrandLink secondary />)

    expect(BrandLink.first().prop('className')).to.contain('secondary')
  })
})
