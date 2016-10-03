import React from 'react'
import classNames from 'classnames'

export default class IconBarItem extends React.Component {

  static get propTypes() {
    return {
      icon: React.PropTypes.string,
      type: React.PropTypes.string,
    }
  }

  render() {
    const classes = {
      'item': true,
      'RevIconBarItem': true,
    }

    return (
      <a {...this.props} className={classNames(this.props.className, classes)}>
        {this.renderIcon()}
        <label className="RevIconBarItem-label">{this.props.children}</label>
      </a>
    )
  }

  renderIcon() {
    const classNameObject = {
      'RevIconBarItem-icon': true,
    }

    if(this.props.icon) {
      return (
        <Revelry.Components.Icon
          type={this.props.type}
          icon={this.props.icon}
          className={classNames(this.props.className, classNameObject)}
        />
      )
    }

    if(this.props.src) {
      return (
        <img src={this.props.src} className={classNames(this.props.className, classNameObject)} />
      )
    }

    return null
  }
}
