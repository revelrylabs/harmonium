import React from 'react'
import classNames from 'classnames'
import _ from 'underscore'

export default class Button extends React.Component {

  static get propsForClassNames() {
    return this._propsForClassNames = this._propsForClassNames || [
      'tiny',
      'small',
      'medium',
      'large',
      'alert',
      'disabled',
      'secondary',
      'success',
      'expanded',
      'hollow',
      'dropdown',
    ]
  }

  get className() {
    let classNamesObject = {RevButton: true, button: true}
    this.constructor.propsForClassNames.forEach((propName) => {
      classNamesObject[propName] = this.props[propName] || false
    })
    return classNames(this.props.className, classNamesObject)
  }

  get passThroughProps() {
    return _.omit(this._propsForClassNames)
  }

  render() {
    return <button {...this.passThroughProps} disabled={this.props.disabled} className={this.className}>
      {this.props.children}
    </button>
  }

}
