import Row from './Row'

describe('Row', () => {
  it('should render without throwing', () => {
    shallow(<Row />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'row'
    const testClassName = '__TEST__'

    const childClassName = shallow(<Row className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })

  it('handles numerical props', () => {
    const cases = {
      /* prop: classPattern */
      smallUp: 'small-up-1',
      mediumUp: 'medium-up-1',
      largeUp: 'large-up-1',
    }

    for (let propName in cases) {
      const classPattern = cases[propName]
      const component = shallow(<Row {...{[propName]: 1}} />)

      expect(component.prop('className')).to.contain(classPattern)
    }
  })

  it('handles boolean props', () => {
    const component = shallow(<Row collapse />)

    expect(component.prop('className')).to.contain('collapse')
  })
})
