import React from 'react'
import _ from 'underscore'

export default class NumberFormatter extends React.Component {

  static get propTypes() {
    return {
      value: React.PropTypes.number.isRequired,
      locales: React.PropTypes.string,
      localeMatcher: React.PropTypes.oneOf(['lookup', 'best fit']),
      style: React.PropTypes.oneOf(['decimal', 'currency', 'percent']),
      currency: React.PropTypes.string,
      currencyDisplay: React.PropTypes.oneOf(['symbol', 'code', 'name']),
      useGrouping: React.PropTypes.bool,
      minimumIntegerDigits: React.PropTypes.number,
      minimumFractionDigits: React.PropTypes.number,
      maximumFractionDigits: React.PropTypes.number,
      minimumSignificantDigits: React.PropTypes.number,
      maximumSignificantDigits: React.PropTypes.number,
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
