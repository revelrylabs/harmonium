import React from 'react'


export default class Currency extends React.Component {

  static get propTypes() {
    return Revelry.Components.NumberFormatter.propTypes
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
    return <Revelry.Components.NumberFormatter {...this.props} />
  }
}
