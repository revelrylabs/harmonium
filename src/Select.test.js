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
})
