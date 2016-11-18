import React from 'react'
import classNames from 'classnames'

const PROP_TYPES = {
  collapse: false,
}

export default class Row extends React.Component {
  static propTypes = PROP_TYPES;

  get className() {
    return classNames(this.props.className, {
      'RevRow': true,
      'row': true,
      'collapse': this.props.collapse,
    })
  }

  render() {
    return <div {...this.props} className={this.className}>
      {this.props.children}
    </div>
  }
}
