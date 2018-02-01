import React, {Component, cloneElement} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const CLASS_NAMES = {
  left: 'Text-left',
  right: 'Text-right',
  center: 'Text-center',
  justify: 'Text-justify',

  smallLeft: 'Text--smallLeft',
  smallRight: 'Text--smallRight',
  smallCenter: 'Text--smallCenter',
  smallJustify: 'Text--smallJustify',

  mediumLeft: 'Text--mediumLeft',
  mediumRight: 'Text--mediumRight',
  mediumCenter: 'Text--mediumCenter',
  mediumJustify: 'Text--mediumJustify',

  largeLeft: 'Text--largeLeft',
  largeRight: 'Text--largeRight',
  largeCenter: 'Text--largeCenter',
  largeJustify: 'Text--largeJustify',

  xlargeLeft: 'Text--xlargeLeft',
  xlargeRight: 'Text--xlargeRight',
  xlargeCenter: 'Text--xlargeCenter',
  xlargeJustify: 'Text--xlargeJustify',

  xxlargeLeft: 'Text--xxlargeLeft',
  xxlargeRight: 'Text--xxlargeRight',
  xxlargeCenter: 'Text--xxlargeCenter',
  xxlargeJustify: 'Text--xxlargeJustify',
}

const PROP_TYPES = {
  children: PropTypes.element,
}
Object.keys(CLASS_NAMES).forEach(key => PROP_TYPES[key] = PropTypes.bool)

export default class TextAlign extends Component {

  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    const classNamesList = [this.props.children.className]
    Object.keys(this.props).forEach(propName => {
      const className = CLASS_NAMES[propName]
      if(className) {
        classNamesList.push(className)
      }
    })
    return cloneElement(this.props.children, {className: classNames(classNamesList)})
  }
}
