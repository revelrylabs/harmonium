import Button from './Button'

describe('Button', () => {
  it('should render without throwing', () => {
    shallow(<Button />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'button'
    const testClassName = '__TEST__'

    const childClassName = shallow(<Button className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })
})
