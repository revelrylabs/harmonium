import React from 'react'


export default class Emptyable extends React.Component {

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
    console.log(this.props.children)
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
