import NewDrawer from './NewDrawer'
import { Expander } from './StatelessDrawer'

describe('NewDrawer', () => {
  it('should render', () => {
    shallow(<NewDrawer />)
  })

  it('can handle boolean props', () => {
    const expander = mount(<NewDrawer left />).find(Expander)

    expect(expander.prop('className')).to.contain('rev-Drawer--left')
  })

  it('can expand and collapse', () => {
    const drawer = mount(<NewDrawer left />)
    const expander = drawer.find(Expander)
    const closer = expander.find('.rev-Drawer-closer')
    closer.simulate('click')

    expect(expander.find('.rev-Drawer').prop('className')).to.not.contain('rev-Drawer--open')

    expander.find('.rev-Drawer-expander').simulate('click')
    drawer.update()

    expect(drawer.find('.rev-Drawer').prop('className')).to.contain('rev-Drawer--open')
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'

    const input = shallow(<NewDrawer className={testClassName} />).find(`.${testClassName}`)

    expect(input.exists()).to.equal(true)
  })
})
