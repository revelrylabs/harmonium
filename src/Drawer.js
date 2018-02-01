import React, {PropTypes} from 'react'
import {Row, Col} from 'possum/lib/grid'
import CloseButton from 'possum/lib/CloseButton'

export class Drawer extends React.Component {
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
    return <Expander
      open={this.state.open}
      className={this.props.className}
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
    {props.children}
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
