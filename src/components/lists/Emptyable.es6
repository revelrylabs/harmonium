import React from 'react'
import Revelry from '../../revelry'

export default Revelry.registerComponent('Emptyable', class Emptyable extends React.Component {

  static get propTypes() {
    return {
      componentClass: React.PropTypes.node,
      emptyState: React.PropTypes.element.isRequired,
    }
  }

  static get defaultProps() {
    return {
      componentClass: 'div',
    }
  }

  render() {
    if(this.props.children && this.props.children.length > 0) {
      return React.createElement(
        this.props.componentClass,
        this.props,
        this.props.children
      )
    }
    return this.props.emptyState
  }
})
