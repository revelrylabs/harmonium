import React from 'react'
import PropTypes from 'prop-types'

export default class Emptyable extends React.Component {
  static get propTypes() {
    return {
      componentClass: PropTypes.node,
      emptyState: PropTypes.element.isRequired,
      children: PropTypes.node,
    }
  }

  static get defaultProps() {
    return {
      componentClass: 'div',
    }
  }

  render() {
    const {children, componentClass, emptyState, ...props} = this.props

    if (children) {
      return React.createElement(componentClass, {...props}, children)
    }
    return emptyState
  }
}
