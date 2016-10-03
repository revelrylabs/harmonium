import React from 'react'
import classNames from 'classnames'

const CLASS_NAME_PROPS = ['secondary', 'primary', 'success', 'warning', 'alert']

export default class Callout extends React.Component {

  get className() {
    const classNamesObject = {
      callout: true
    }
    CLASS_NAME_PROPS.forEach((name) => {
      if(this.props[name]) {
        classNamesObject[name] = true
      }
    })
    return classNames(classNamesObject)
  }

  render() {
    return <div {...this.props} className={this.className}>
      {this.props.children}
    </div>
  }
}
