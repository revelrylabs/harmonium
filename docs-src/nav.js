import React, {Component} from 'react'
import classNames from 'classnames'
import Menu from '../src/Menu'

export default class Nav extends Component {
  render() {
    const {keys, activeKey} = this.props
    const items = keys.map((name) => {
      const className = classNames({
        'is-active': name == activeKey,
      })
      return (
        <Menu.Item key={name} className={className}>
          <a href={`./${name}.html#top`}>{name}</a>
        </Menu.Item>
      )
    })
    return (
      <nav>
        <h1><a href="./index.html">CORE</a></h1>
        <Menu vertical>{items}</Menu>
      </nav>
    )
  }
}
