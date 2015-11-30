Rev.registerComponent('Currency', class Currency extends React.Component {

  static get propTypes() {
    return Rev.Components.NumberFormatter.propTypes
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
    return <Rev.Components.NumberFormatter {...this.props} />
  }
})
