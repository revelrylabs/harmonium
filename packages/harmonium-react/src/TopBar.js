import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  fixed: 'rev-TopBar--fixed',
  center: 'rev-TopBar--center',
  left: 'rev-TopBar--left',
  justified: 'rev-TopBar--justified',
  right: 'rev-TopBar--right',
  breakpointMedium: 'rev-TopBar-breakpoint--mediumDown',
  breakpointLarge: 'rev-TopBar-breakpoint--largeDown',
  breakpointXlarge: 'rev-TopBar-breakpoint--xlargeDown',
  breakpointXxlarge: 'rev-TopBar-breakpoint--xxlargeDown',
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class TopBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props
    const propClassNames = []

    BOOL_PROPS.forEach((name) => {
      if (props[name]) {
        propClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
    })
    const newClassName = classNames(className, 'rev-TopBar', propClassNames)

    return (
      <div {...props} className={newClassName}>
        <nav>{children}</nav>
      </div>
    )
  }
}

class TopBarItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    scroll: PropTypes.bool,
    scrollSmall: PropTypes.bool,
    scrollMeidum: PropTypes.bool,
    scrollLarge: PropTypes.bool,
    scrollXlarge: PropTypes.bool,
    scrollMediumDown: PropTypes.bool,
    scrollLargeDown: PropTypes.bool,
    scrollXlargeDown: PropTypes.bool,
    scrollNav: PropTypes.bool,
    scrollNavOnly: PropTypes.bool,
  }

  render() {
    const {className, children, scroll, scrollSmall, scrollMedium, scrollLarge, scrollXlarge, scrollMediumDown, scrollLargeDown, scrollXlargeDown, scrollNav, scrollNavOnly, ...props} = this.props
    
    const newClassName = classNames(`rev-TopBar-item ${className || ''}`, {
      'rev-TopBar-item--scroll': scroll,
      'rev-TopBar-item--scroll--smallOnly': scrollSmall,
      'rev-TopBar-item--scroll--medium': scrollMedium,
      'rev-TopBar-item--scroll--large': scrollLarge,
      'rev-TopBar-item--scroll--xLarge': scrollXlarge,
      'rev-TopBar-item--scroll--mediumDown': scrollMediumDown,
      'rev-TopBar-item--scroll--largeDown': scrollLargeDown,
      'rev-TopBar-item--scroll--xLargeDown': scrollXlargeDown,
      'rev-TopBar-item--scroll--nav': scrollNav,
      'rev-TopBar-item--scroll--navOnly': scrollNavOnly,
    })

    return (
      <div {...props} className={newClassName}>
        {children}
      </div>
    )
  }
}
TopBar.Item = TopBarItem
