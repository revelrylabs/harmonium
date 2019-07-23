import React from 'react'
import {shallow} from 'enzyme'
import TopBar from './TopBar'

describe('TopBar', () => {
  it('should render without throwing', () => {
    shallow(<TopBar />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'rev-TopBar'
    const testClassName = '__TEST__'

    const childClassName = shallow(<TopBar className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })

  it('handles boolean styling props', () => {
    const topBar = shallow(<TopBar breakpointMedium />)

    expect(topBar.prop('className')).to.contain(
      'rev-TopBar-breakpoint--mediumDown'
    )
  })
})

describe('Topbar.Item', () => {
  it('should render without throwing', () => {
    shallow(<TopBar.Item />)
  })
})
