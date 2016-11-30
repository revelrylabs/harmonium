import Input from './Input'

describe('Input', () => {
  it('should render without throwing', () => {
    shallow(<Input />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<Input className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })
})
