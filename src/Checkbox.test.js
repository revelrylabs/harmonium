import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('should render without throwing', () => {
    shallow(<Checkbox />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const childClassName = shallow(<Checkbox className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(testClassName)
  })
})
