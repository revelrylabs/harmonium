import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const BOOL_PROPS_TO_CLASS_NAMES = {
  left: 'rev-Drawer--left',
  right: 'rev-Drawer--right',
  top: 'rev-Drawer--top',
  scroll: 'rev-Drawer--scroll',
  fixed: 'rev-Drawer--fixed',
  overlay: 'rev-Drawer--overlay',
  collapsible: 'rev-Drawer--collapsible',
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class StatelessDrawer extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    expand: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    closerChildren: PropTypes.node,
    expanderChildren: PropTypes.node,
    expanderComponentClass: PropTypes.string,
  }

  static defaultProps = {
    expanderComponentClass: 'a',
    expanderClassName: '',
    expanderChildren: 'Expand this',
    closerChildren: 'Close This',
    open: false,
  }

  expand = () => {
    if (this.props.expand) {
      this.props.expand()
    }
  }

  close = () => {
    if (this.props.close) {
      this.props.close()
    }
  }

  render() {
    const propClassNames = BOOL_PROPS.reduce((acc, key) => {
      const value = BOOL_PROPS_TO_CLASS_NAMES[key]
      acc[value] = this.props[key]
      return acc
    }, {})
    const newClassName = classNames(this.props.className, propClassNames)

    return <Expander
      open={this.props.open}
      className={newClassName}
      closer={<a className="rev-Drawer-closer" onClick={this.close}>{this.props.closerChildren}</a>}
    >
      {
        React.createElement(
          this.props.expanderComponentClass,
          {
            className: `rev-Drawer-expander`,
            onClick: this.expand,
          },
          this.props.expanderChildren,
        )
      }
      {this.props.children}
    </Expander>
  }
}

export const Expander = (props) => {
  return <div className={`rev-Drawer ${props.open ? 'rev-Drawer--open' : ''} ${props.className}`}>
    {props.closer}
    <div className="rev-Drawer-contents">
      {props.children}
    </div>
  </div>
}

Expander.defaultProps = {
  className: '',
}

Expander.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  closer: PropTypes.node,
  open: PropTypes.bool,
}
