import React from 'react'
import NumberFormatter from './NumberFormatter'

export default class Currency extends React.Component {
  static get propTypes() {
    return NumberFormatter.propTypes
  }

  static get defaultProps() {
    return {
      currency: 'USD',
      style: 'currency',
      minimumFractionDigits: 2,
      maxmimumFractionDigits: 2,
    }
  }

  render() {
    return <NumberFormatter {...this.props} />
  }
}
