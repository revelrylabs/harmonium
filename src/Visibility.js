import React, {Component, cloneElement} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const CLASS_NAMES = {
  showForSmall: 'show-for-small',
  showForMedium: 'show-for-medium',
  showForLarge: 'show-for-large',

  showForSmallOnly: 'show-for-small-only',
  showForMediumOnly: 'show-for-medium-only',
  showForLargeOnly: 'show-for-large-only',

  hideForSmall: 'hide-for-small',
  hideForMedium: 'hide-for-medium',
  hideForLarge: 'hide-for-large',

  hideForSmallOnly: 'hide-for-small-only',
  hideForMediumOnly: 'hide-for-medium-only',
  hideForLargeOnly: 'hide-for-large-only',
}

const PROP_TYPES = {
  children: PropTypes.element,
}
Object.keys(CLASS_NAMES).forEach(key => PROP_TYPES[key] = PropTypes.bool)

export default class Visibility extends Component {

  static propTypes = PROP_TYPES;

  render() {
    const classNamesList = [this.props.className]
    Object.keys(this.props).forEach((propName) => {
      const className = CLASS_NAMES[propName]
      if(className) {
        classNamesList.push(className)
      }
    })

    const newClassName = classNames(classNamesList)
    return (
      cloneElement(this.props.children, {className: newClassName})
    )
  }
}
