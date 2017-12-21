import Badge from './Badge'

describe('Badge', () => {
  it('should render without throwing', () => {
    shallow(<Badge />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'rev-Badge'
    const testClassName = '__TEST__'

    const childClassName = shallow(<Badge className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })

  it('should accept a badge type prop', () => {
    const secondaryBadge = shallow(<Badge secondary />)

    expect(secondaryBadge.prop('className')).to.contain('secondary')
  })
})
