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

export default class Drawer extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.node,
      className: PropTypes.string,
      closerChildren: PropTypes.node,
      expanderChildren: PropTypes.node,
      expanderComponentClass: PropTypes.string,
    }
  }

  static get defaultProps() {
    return {
      expanderComponentClass: 'a',
      expanderClassName: '',
      expanderChildren: 'Expand this',
      closerChildren: 'Close This',
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  expandPane = () => {
    this.setState({open: true})
  }

  closePane = () => {
    this.setState({open: false})
  }

  render() {
    const propClassNames = BOOL_PROPS.reduce((acc, key) => {
      const value = BOOL_PROPS_TO_CLASS_NAMES[key]
      acc[value] = this.props[key]
      return acc
    }, {})
    const newClassName = classNames(this.props.className, propClassNames)

    return <Expander
      open={this.state.open}
      className={newClassName}
      closer={<a className="rev-Drawer-closer" onClick={this.closePane}>{this.props.closerChildren}</a>}
    >
      {
        React.createElement(
          this.props.expanderComponentClass,
          {
            className: `rev-Drawer-expander`,
            onClick: this.expandPane,
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
