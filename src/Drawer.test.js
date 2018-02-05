import Drawer from './Drawer'

describe('Drawer', () => {
  it('should render without throwing', () => {
    shallow(<Drawer />)
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const input = shallow(<Drawer className={testClassName} />).find(`.${testClassName}`)

    expect(input.exists()).to.equal(true)
  })
})
