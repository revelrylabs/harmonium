import React from 'react'
import Revelry from '../../revelry'

export default Revelry.registerComponent('I18n', class I18n extends React.Component {

  static get propTypes() {
    return {
      t: React.PropTypes.string.isRequired,
    }
  }

  get text() {
    if(typeof(I18n) === 'undefined') {
      throw new Error('Missing i18n-js dependency for Revelry.Components.I18n')
    }
    return I18n.t(this.props.t, this.props)
  }

  render() {
    return <span>{this.text}</span>
  }
})
