import React from 'react'


export default class I18n extends React.Component {

  static get propTypes() {
    return {
      t: React.PropTypes.string.isRequired,
    }
  }

  get text() {
    if(typeof(I18n) === 'undefined') {
      throw new Error('Missing i18n-js dependency.')
    }
    return I18n.t(this.props.t, this.props)
  }

  render() {
    return <span>{this.text}</span>
  }
}
