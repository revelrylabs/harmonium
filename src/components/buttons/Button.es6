import React from 'react'
import Revelry from '../../revelry'

export default Revelry.registerComponent('Button', class Button extends React.Component {

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
      'expand',
    ]
  }

  get className() {
    let classNamesObject = {RevButton: true, button: true}
    this.constructor.propsForClassNames.forEach((propName) => {
      classNamesObject[propName] = this.props[propName] || false
    })
    return this.classAdd(classNamesObject)
  }

  get passThroughProps() {
    return this.getPropsWithout(this._propsForClassNames)
  }

  render() {
    return <button {...this.passThroughProps} className={this.className}>
      {this.props.children}
    </button>
  }

})
