import React, {Component, PropTypes} from 'react'

export default class Radio extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    label: PropTypes.string,
    className: PropTypes.string,
    checked: PropTypes.bool,
    onRadioClick: PropTypes.func,
  }

  get radioButton() {
    return <input
      className={this.inputClasses}
      type="radio"
      name={this.props.name}
      value={this.props.value}
      onClick={this.handleClick}
    />
  }

  handleClick = () => {
    this.props.onRadioClick(this.props.value)
  }

  render() {
    return (
      <label className={`RevInput-radio ${this.props.className}`}>
        {this.radioButton}
        <span className="RevInput-radio-copy">{this.props.label}</span>
      </label>
    )
  }
}
