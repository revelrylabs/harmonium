import React, {PropTypes} from 'react'
import {Row} from './grid'
import classNames from 'classnames'
import _str from 'underscore.string'

const BOOL_PROPS = [
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

const NUMBER_PROPS = [
  'smallUp',
  'mediumUp',
  'largeUp',
]

const PROP_TYPES = {
  children: PropTypes.element,
}

BOOL_PROPS.forEach((x) => PROP_TYPES[x] = React.PropTypes.bool)
NUMBER_PROPS.forEach((x) => PROP_TYPES[x] = React.PropTypes.oneOf([
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

const CLASS_NAMES = {
  'RevRow': true,
  'row': true,

  collapse: 'collapse',
  smallUnstack: 'small-unstack',
  mediumUnstack: 'medium-unstack',
  largeUnstack: 'large-unstack',
  alignRight: 'align-right',
  alignCenter: 'align-center',
  alignJustify: 'align-justify',
  alignSpaced: 'align-spaced',
  alignTop: 'align-top',
  alignMiddle: 'align-middle',
  alignStretch: 'align-stretch',
  smallCollapse: 'small-collapse',
  mediumCollapse: 'medium-collapse',
  largeCollapse: 'large-collapse',
  smallUncollapse: 'small-uncollapse',
  mediumUncollapse: 'medium-uncollapse',
  largeUncollapse: 'large-uncollapse',
}

export default class FlexRow extends Row {

  //static propTypes = PROP_TYPES;
  static get propTypes() {
    return PROP_TYPES
  }

  // static defaultProps = {
  //   collapse: false,
  // };
  static get propTypes() {
    return {
      collapse: false,
    }
  }

  get className() {
    let numberClassNamesObject = {}

    NUMBER_PROPS.forEach((x) => {
      let count = this.props[x]
      if(count != null) {
        numberClassNamesObject[`${_str.dasherize(x)}-${count}`] = true
      }
    })

    return classNames(this.props.className, Object.assign({}, CLASS_NAMES, numberClassNamesObject))
  }

  render() {
    return <div {...this.props} className={this.className}>
      {this.props.children}
    </div>
  }
}
