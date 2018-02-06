import Drawer, { Expander } from './Drawer'

describe('Drawer', () => {
  it('should render', () => {
    shallow(<Drawer />)
  })

  it('can handle boolean props', () => {
    const expander = shallow(<Drawer left />).find(Expander)

    expect(expander.prop('className')).to.contain('rev-Drawer--left')
  })

  it('can expand and collapse', () => {
    const drawer = mount(<Drawer left />)
    const expander = drawer.find(Expander)
    const closer = expander.find('.rev-Drawer-closer')
    closer.simulate('click')

    expect(expander.find('.rev-Drawer').prop('className')).to.not.contain('rev-Drawer--open')

    expander.find('.rev-Drawer-expander').simulate('click')
    drawer.update()

    expect(drawer.find('.rev-Drawer').prop('className')).to.contain('rev-Drawer--open')
  })
})
