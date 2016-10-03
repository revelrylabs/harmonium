import React from 'react'
import classNames from 'classnames'

export default class TabBlock extends React.Component {

  static get propTypes() {
    return {
      active: React.PropTypes.bool,
    }
  }

  static get defaultProps() {
    return {
      active: false,
    }
  }

  get className() {
    return classNames(this.props.className, {
      'RevTabBlock': true,
      'RevTabBlock--active': this.props.active,
      'tabs-panel': true,
      'is-active': this.props.active,
    })
  }

  render() {
    return <div {...this.props}
      className={this.className}
      key={this.props.key}
    />
  }
}
