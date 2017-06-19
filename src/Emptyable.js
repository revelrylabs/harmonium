import React from 'react'
import PropTypes from 'prop-types'

export default class Emptyable extends React.Component {

  static get propTypes() {
    return {
      componentClass: PropTypes.node,
      emptyState: PropTypes.element.isRequired,
    }
  }

  static get defaultProps() {
    return {
      componentClass: 'div',
    }
  }

  render() {
    if(this.props.children) {
      return React.createElement(
        this.props.componentClass,
        this.props,
        this.props.children
      )
    }
    return this.props.emptyState
  }
}
