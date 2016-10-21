import React from 'react'
import classNames from 'classnames'
import _str from 'underscore.string'
import {Row, Col} from './grid'

class FlexRow extends Row {
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

  static get boolProps() {
    return this._boolProps = this._boolProps || [
      'collapse',
      'smallUnstack',
      'mediumUnstack',
      'largeUnstack',
      'alignRight',
      'alignCenter',
      'alignJustify',
      'alignSpaced',
      'alignTop',
      'alignMiddle',
      'alignStretch',
      'smallCollapse',
      'mediumCollapse',
      'largeCollapse',
      'smallUncollapse',
      'mediumUncollapse',
      'largeUncollapse',
    ]
  }

  static get numberProps() {
    return this._numberProps = this._numberProps || [
      'smallUp',
      'mediumUp',
      'largeUp',
    ]
  }

  static get defaultProps() {
    return {
      collapse: false,
    }
  }

  get className() {
    let classNamesObject = {
      'RevRow': true,
      'row': true,
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
    return classNames(this.props.className, classNamesObject)
  }

  render() {
    return <div {...this.props} className={this.className}>
      {this.props.children}
    </div>
  }
}

class FlexCol extends Col {
  static get boolProps() {
    return this._boolProps = this._boolProps || [
      'end',
      'smallCentered',
      'mediumCentered',
      'largeCentered',
      'smallUncentered',
      'mediumUncentered',
      'largeUncentered',
      'shrink',
      'smallExpand',
      'mediumExpand',
      'largeExpand',
      'alignSelfBottom',
      'alignSelfMiddle',
      'alignSelfTop',
    ]
  }
}

export {FlexCol as Col, FlexRow as Row};
