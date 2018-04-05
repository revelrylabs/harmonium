import React from 'react'
import PropTypes from 'prop-types'
import {omit} from 'underscore'

export default class NumberFormatter extends React.Component {
  static get propTypes() {
    return {
      value: PropTypes.number.isRequired,
      locales: PropTypes.string,
    }
  }

  get optionProps() {
    return omit(this.props, ['locales', 'value'])
  }

  get text() {
    return this.props.value.toLocaleString(this.props.locales, this.optionProps)
  }

  render() {
    return <span>{this.text}</span>
  }
}
