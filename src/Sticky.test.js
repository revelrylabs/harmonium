import React from 'react'
import Sticky from './Sticky'

describe('Sticky', () => {
  it('should render without throwing', () => {
    shallow(
      <Sticky.Container>
        <Sticky>
          <span>test</span>
        </Sticky>
      </Sticky.Container>
    )
  })

  it('should add className to content div', () => {
    const inherentClassName = 'rev-Sticky'
    const testClassName = '__TEST__'

    const childClassName = mount(
      <Sticky.Container>
        <Sticky className={testClassName}>
          <span>test</span>
        </Sticky>
      </Sticky.Container>
    )
      .find('div')
      .at(2)
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })
})
