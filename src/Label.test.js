import Label from './Label'

describe('Label', () => {
  it('should render without throwing', () => {
    shallow(<Label />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'label'
    const testClassName = '__TEST__'

    const childClassName = shallow(<Label className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })

  it('it handles boolean type props', () => {
    const label = shallow(<Label secondary />)

    expect(label.prop('className')).to.contain('secondary')
  })
})
