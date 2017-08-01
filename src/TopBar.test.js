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

  it('handles boolean styling components', () => {
    const topBar = shallow(<TopBar stackedForMedium />)
    console.log(topBar.debug())
    expect(topBar.prop('className')).to.contain('stacked-for-medium')
  })
})

describe('Topbar.Left', () => {
  it('should render without throwing', () => {
    shallow(<TopBar.Left />)
  })
})

describe('Topbar.Right', () => {
  it('should render without throwing', () => {
    shallow(<TopBar.Right />)
  })
})

describe('Topbar.Title', () => {
  it('should render without throwing', () => {
    shallow(<TopBar.Title />)
  })
})
