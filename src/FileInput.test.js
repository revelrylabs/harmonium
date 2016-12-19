import FileInput from './FileInput'

describe('FileInput', () => {
  it('should render without throwing', () => {
    shallow(<FileInput />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<FileInput className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })
})

describe('FileInput.Stack', () => {
  it('should render without throwing', () => {
    shallow(<FileInput.Stack />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<FileInput.Stack className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })
})
