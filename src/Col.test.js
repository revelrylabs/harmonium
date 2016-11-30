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
})
