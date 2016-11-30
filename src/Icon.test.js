import Icon from './Icon'

describe('Icon', () => {
  it('should render without throwing', () => {
    shallow(<Icon />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<Icon className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })
})
