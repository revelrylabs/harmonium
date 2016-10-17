import React, {Component, PropTypes, cloneElement} from 'react'
import classNames from 'classnames'

const CLASS_NAMES = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
  justify: 'text-justify',
  smallLeft: 'small-text-left',
  smallRight: 'small-text-right',
  smallCenter: 'small-text-center',
  smallJustify: 'small-text-justify',
  mediumLeft: 'medium-text-left',
  mediumRight: 'medium-text-right',
  mediumCenter: 'medium-text-center',
  mediumJustify: 'medium-text-justify',
  largeLeft: 'large-text-left',
  largeRight: 'large-text-right',
  largeCenter: 'large-text-center',
  largeJustify: 'large-text-justify',
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
