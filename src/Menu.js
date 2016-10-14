import React from 'react'
import classNames from 'classnames'

class MenuItem extends React.Component {
    static get propTypes() {
        return {
            dropdown: React.PropTypes.bool,
            displayChildren: React.PropTypes.bool
        }
    }

    static get defaultProps() {
        return {
            dropdown: false,
            displayChildren: true
        }
    }

    get classes() {
        const classes = classNames({
            'is-dropdown-submenu-parent' : this.props.dropdown
        });

        return classes
    }

    get displayChildren() {
        if (this.props.displayChildren){
            return this.props.children
        } else if(this.props.displayChildren == false && this.props.dropdown) {
            return this.props.children[0]
        } else {
            return null
        }
    }

    render() {
        return <li role="menuitem" className={this.classes}>
          {this.displayChildren}
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

  get classes() {
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
      return <ul className={this.classes} role="menu">
            {
                React.Children.map(this.props.children, (child, i) => React.cloneElement(child,
                                                                                       {
                                                                                           key: i,
                                                                                           dropdown: this.props.dropdown
                                                                                       }))
            }
      </ul>
  }
}

export {
  Menu,
  MenuItem
}
