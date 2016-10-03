import React from 'react'

export default class Pluralize extends React.Component {

  static propTypes = {
    count: React.PropTypes.number.isRequired,
    one: React.PropTypes.string.isRequired,
    more: React.PropTypes.string,
  };

  get text() {
    if(this.props.count === 1) {
      return `${this.props.count} ${this.props.one}`
    }
    return `${this.props.count} ${this.props.more || this.props.one+'s'}`
  }

  render() {
    return <span>{this.text}</span>
  }
}
