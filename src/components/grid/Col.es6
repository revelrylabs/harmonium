import React from 'react'
import _str from 'underscore.string'
import Revelry from '../../revelry'

export default Revelry.registerComponent('Col', class Col extends React.Component {

  static get boolProps() {
    return this._boolProps = this._boolProps || [
      'end',
      'smallCentered',
      'mediumCentered',
      'largeCentered',
      'smallUncentered',
      'mediumUncentered',
      'largeUncentered',
    ]
  }

  static get numberProps() {
    return this._numberProps = this._numberProps || [
      'small',
      'smallOffset',
      'smallPush',
      'smallPull',
      'medium',
      'mediumOffset',
      'mediumPush',
      'mediumPull',
      'large',
      'largeOffset',
      'largePush',
      'largePull',
    ]
  }

  static get propTypes() {
    let propTypes = {}
    this.boolProps.forEach((x) => propTypes[x] = React.PropTypes.bool)
    this.numberProps.forEach((x) => propTypes[x] = React.PropTypes.oneOf([
      1, '1',
      2, '2',
      3, '3',
      4, '4',
      5, '5',
      6, '6',
      7, '7',
      8, '8',
      9, '9',
      10, '10',
      11, '11',
      12, '12',
    ]))
    return propTypes
  }

  get className() {
    let classNamesObject = {
      'RevCol': true,
      'columns': true,
    }

    this.constructor.boolProps.forEach((x) => {
      if(this.props[x]) {
        classNamesObject[_str.dasherize(x)] = true
      }
    })

    this.constructor.numberProps.forEach((x) => {
      let count = this.props[x]
      if(count != null) {
        classNamesObject[`${_str.dasherize(x)}-${count}`] = true
      }
    })

    return this.classAdd(classNamesObject)
  }

  render() {
    return <div {...this.props} className={this.className}>
      {this.props.children}
    </div>
  }

})
