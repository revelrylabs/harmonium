import React from 'react'
import classNames from 'classnames'

class MenuItem extends React.Component {
  render() {
    return <li>
      {this.props.children}
    </li>
  }
}


class Menu extends React.Component {
  static get propTypes() {
    return {
        horizontal: React.PropTypes.bool,
        vertical: React.PropTypes.bool,
      drilldown: React.PropTypes.bool,
      dropdown: React.PropTypes.bool
    }
  }

  static get defaultProps() {
    return {
      vertical: true,
      horizontal: false,
      drilldown: false,
      dropdown: false
    }
  }

  get menuClasses() {
    const classes = classNames({
      'menu' : true,
      'vertical' : this.props.vertical && !this.props.horizontal,
      'horizontal' : this.props.horizontal,
      'drilldown' : this.props.drilldown,
      'dropdown' : this.props.dropdown
    });

    return classes
  }

  render() {
    return <ul className={this.menuClasses}>
      { React.Children.map(this.props.children, (child, i) => React.cloneElement(child, { key: i })) }
      </ul>
  }
}

export {
  Menu,
  MenuItem
}
