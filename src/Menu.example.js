import React, {Component} from 'react'
import Menu from './Menu'

export class Example extends Component {
  render() {
    return (
        <Menu>
        <a href="#">Item 1</a>
        <a href="#">Item 2</a>
        <a href="#">Item 3</a>
        </Menu>
    )
  }
}
