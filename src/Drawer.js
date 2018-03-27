import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import StatelessDrawer from './StatelessDrawer'
import Expander from './Expander'

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

export default class Drawer extends Component {
  static propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    closerChildren: PropTypes.node,
    expanderChildren: PropTypes.node,
    expanderClassName: PropTypes.string,
    expanderComponentClass: PropTypes.string,
  }

  static defaultProps = {
    expanderComponentClass: 'a',
    expanderClassName: '',
    expanderChildren: 'Expand this',
    closerChildren: 'Close This',
    open: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: props.open,
    }
  }

  expandDrawer = () => {
    this.setState({open: true})
  }

  closeDrawer = () => {
    this.setState({open: false})
  }

  render() {
    const {open} = this.state
    const propClassNames = BOOL_PROPS.reduce((acc, key) => {
      const value = BOOL_PROPS_TO_CLASS_NAMES[key]

      acc[value] = this.props[key]
      return acc
    }, {})
    const newClassName = classNames(this.props.className, propClassNames)

    return (
      <StatelessDrawer
        open={open}
        className={newClassName}
        close={this.closeDrawer}
        expand={this.expandDrawer}
        expanderComponentClass={this.props.expanderComponentClass}
        expanderClassName={this.props.expanderClassName}
        expanderChildren={this.props.expanderChildren}
        closerChildren={this.props.closerChildren}
      >
        {this.props.children}
      </StatelessDrawer>
    )
  }
}

export {Drawer, Expander}
