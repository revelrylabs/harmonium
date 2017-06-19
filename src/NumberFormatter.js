import React from 'react'
import PropTypes from 'prop-types'
import _ from 'underscore'

export default class NumberFormatter extends React.Component {

  static get propTypes() {
    return {
      value: PropTypes.number.isRequired,
      locales: PropTypes.string,
      localeMatcher: PropTypes.oneOf(['lookup', 'best fit']),
      style: PropTypes.oneOf(['decimal', 'currency', 'percent']),
      currency: PropTypes.string,
      currencyDisplay: PropTypes.oneOf(['symbol', 'code', 'name']),
      useGrouping: PropTypes.bool,
      minimumIntegerDigits: PropTypes.number,
      minimumFractionDigits: PropTypes.number,
      maximumFractionDigits: PropTypes.number,
      minimumSignificantDigits: PropTypes.number,
      maximumSignificantDigits: PropTypes.number,
    }
  }

  get optionProps() {
    return _.omit(this.props, ['locales', 'value'])
  }

  get text() {
    return this.props.value.toLocaleString(this.props.locales, this.optionProps)
  }

  render() {
    return <span>{this.text}</span>
  }
}
