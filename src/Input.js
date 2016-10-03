import React from 'react'
import classNames from 'classnames'
import _ from 'underscore'

export default class Input extends React.Component {

  static get defaultProps() {
    return {
      dom: 'input',
      type: 'text',
    }
  }

  get typeClassMod() {
    return this.props.dom === 'input' ? this.props.type : this.props.dom
  }

  get labelClassName() {
    let labelClassNamesObject = {
      'RevInput': true,
      'RevInput--label': true,
      'is-invalid-label': this.props.error != null,
    }
    labelClassNamesObject[`RevInput-${this.typeClassMod}`] = true // E.g., "RevInput-checkbox"
    return classNames(labelClassNamesObject)
  }

  get input() {
    let props = _.omit(['dom', 'error', 'className'])
    props.className = classNames(this.props.className, {
      'RevInput--input': true,
      'is-invalid-input': this.props.error != null,
    })
    return React.createElement(this.props.dom, props, this.props.children)
  }

  get innerLabel() {
    return <span className="RevInput--innerLabel">{this.props.label}</span>
  }

  get error() {
    if(this.props.error) {
      return <span className="RevError form-error is-visible">{this.props.error}</span>
    }
    return null
  }

  get helpText() {
    const {helpText} = this.props
    return helpText ? <p className="RevInput-helpText help-text">{helpText}</p> : null
  }

  get shouldPutLabelAfterInput() {
    return this.props.type === 'checkbox' || this.props.type === 'radio'
  }

  render() {
    return <label className={this.labelClassName}>
      {this.shouldPutLabelAfterInput ? null : this.innerLabel}
      {this.input}
      {this.shouldPutLabelAfterInput ? this.innerLabel : null}
      {this.error}
      {this.helpText}
    </label>
  }

}
