import React from 'react'
import classNames from 'classnames'

export default class Menu extends React.Component {
  render() {
    return <ul className="vertical medium-horizontal menu">
      { React.Children.map(this.props.children, (child, i) => <li key={i}>{child}</li>) }
      </ul>
  }
}
