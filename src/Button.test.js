import Button from './Button'

describe('Button', () => {
  it('should render without throwing', () => {
    shallow(<Button />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'rev-Button'
    const testClassName = '__TEST__'

    const childClassName = shallow(<Button className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })

  it('should handle props for different button types', () => {
    const button = shallow(<Button secondary />)

    expect(button.first().prop('className')).to.contain('secondary')
  })
})
