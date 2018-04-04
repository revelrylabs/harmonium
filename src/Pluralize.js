import React from 'react'
import PropTypes from 'prop-types'

export default class Pluralize extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    one: PropTypes.string.isRequired,
    more: PropTypes.string,
  }

  get text() {
    if (this.props.count === 1) {
      return `${this.props.count} ${this.props.one}`
    }
    return `${this.props.count} ${this.props.more || `${this.props.one}s`}`
  }

  render() {
    return <span>{this.text}</span>
  }
}
