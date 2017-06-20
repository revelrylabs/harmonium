import Menu from './Menu'


describe('Menu', () => {
  it('should render without throwing', () => {
    shallow(
      <Menu vertical>
        <Menu.Item>
          <a href="#">One</a>
          <Menu nested>
            <Menu.Item><a href="#">A</a></Menu.Item>
          </Menu>
        </Menu.Item>
      </Menu>
    )
  })
})
