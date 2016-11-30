import Row from './Row'

describe('Row', () => {
  it('should render without throwing', () => {
    shallow(<Row />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'row'
    const testClassName = '__TEST__'

    const childClassName = shallow(<Row className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })
})
