import TopBar from './TopBar'

describe('TopBar', () => {
  it('should render without throwing', () => {
    shallow(<TopBar />)
  })

  it('should add className to child', () => {
    const inherentClassName = 'top-bar'
    const testClassName = '__TEST__'

    const childClassName = shallow(<TopBar className={testClassName} />)
      .first()
      .prop('className')

    expect(childClassName).to.contain(inherentClassName)
    expect(childClassName).to.contain(testClassName)
  })
})
