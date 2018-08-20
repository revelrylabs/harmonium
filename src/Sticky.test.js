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

    const stickyClassName = mount(
      <Sticky.Container>
        <Sticky className={testClassName}>
          <span>test</span>
        </Sticky>
      </Sticky.Container>
    )
      .find('div')
      .at(3)
      .prop('className')

    expect(stickyClassName).to.contain(inherentClassName)
    expect(stickyClassName).to.contain(testClassName)
  })
})
