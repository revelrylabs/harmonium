import ButtonGroup from './ButtonGroup'

describe('ButtonGroup', () => {
  it('should render without throwing', () => {
    shallow(<ButtonGroup />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'button-group'
    const testClassName = '__TEST__'

    const childClassName = shallow(<ButtonGroup className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })

  it('should handle a props for different types of button groups', () => {
    const buttonGroup = shallow(<ButtonGroup secondary />)

    expect(buttonGroup.prop('className')).to.contain('secondary')
  })
})
