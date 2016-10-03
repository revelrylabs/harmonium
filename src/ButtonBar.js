import React from 'react'
import classNames from 'classnames'

export default class ButtonBar extends React.Component {
  render() {
    let className = classNames(this.props.className, {
      'RevButtonBar': true,
      'button-bar': true,
    })
    return <div className={className}>
      {this.props.children}
    </div>
  }
}
