import React, {Component} from 'react'
import { Menu, MenuItem } from './Menu'

export class Example extends Component {
  render() {
    return (
        <div>
          <h3>Vertical Menu</h3>
          <Menu>
              <MenuItem>
                  <a href="#">Item 1</a>
              </MenuItem>
              <MenuItem>
                  <a href="#">Item 2</a>
              </MenuItem>
              <MenuItem>
                  <a href="#">Item 3</a>
              </MenuItem>
          </Menu>

          <h3>Horizontal Menu</h3>
          <Menu horizontal>
              <MenuItem>
                  <a href="#">Item 1</a>
              </MenuItem>
              <MenuItem>
                  <a href="#">Item 2</a>
              </MenuItem>
              <MenuItem>
                  <a href="#">Item 3</a>
              </MenuItem>
          </Menu>

          <h3>Sub Menu</h3>
          <Menu dropdown>
              <MenuItem>
                  <a href="#">Item 1</a>
                  <Menu horizontal>
                      <MenuItem>
                          <a href="#">Item 1</a>
                      </MenuItem>
                      <MenuItem>
                          <a href="#">Item 2</a>
                      </MenuItem>
                      <MenuItem>
                          <a href="#">Item 3</a>
                      </MenuItem>
                  </Menu>
              </MenuItem>
              <MenuItem displayChildren={false}>
                  <a href="#">Item 2</a>
                  <Menu horizontal>
                      <MenuItem>
                          <a href="#">Item 4</a>
                      </MenuItem>
                      <MenuItem>
                          <a href="#">Item 5</a>
                      </MenuItem>
                      <MenuItem>
                          <a href="#">Item 6</a>
                      </MenuItem>
                  </Menu>
              </MenuItem>
          </Menu>
        </div>
    )
  }
}
