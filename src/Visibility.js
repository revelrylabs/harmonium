import React, {Component, cloneElement} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const CLASS_NAMES = {
  showForSmallUp: 'Show--smallUp',
  showForMediumUp: 'Show--mediumUp',
  showForLargeUp: 'Show--largeUp',
  showForXlargeUp: 'Show--xlargeUp',
  showForXxlargeUp: 'Show--xxlargeUp',

  showForSmallOnly: 'Show--smallOnly',
  showForMediumOnly: 'Show--mediumOnly',
  showForLargeOnly: 'Show--largeOnly',
  showForXlargeOnly: 'Show--xlargeOnly',
  showForXxlargeOnly: 'Show--xxlargeOnly',

  hideForSmall: 'Hide',
  hideForMedium: 'Hide--mediumUp',
  hideForLarge: 'Hide--largeUp',
  hideForXlarge: 'Hide--xlargeUp',
  hideForXxlarge: 'Hide--xxlargeUp',

  hideForSmallOnly: 'Hide--smallOnly',
  hideForMediumOnly: 'Hide--mediumOnly',
  hideForLargeOnly: 'Hide--largeOnly',
  hideForXlargeOnly: 'Hide--xlargeOnly',
  hideForXxlargeOnly: 'Hide--xxlargeUp',

  hiddenForSmall: 'Hidden',
  hiddenForMedium: 'Hidden--mediumUp',
  hiddenForLarge: 'Hidden--largeUp',
  hiddenForXlarge: 'Hidden--xlargeUp',
  hiddenForXxlarge: 'Hidden--xxlargeUp',

  hiddenForSmallOnly: 'Hidden--smallOnly',
  hiddenForMediumOnly: 'Hidden--mediumOnly',
  hiddenForLargeOnly: 'Hidden--largeOnly',
  hiddenForXlargeOnly: 'Hidden--xlargeOnly',
  hiddenForXxlargeOnly: 'Hidden--xxlargeUp',
}

const PROP_TYPES = {
  children: PropTypes.node,
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
    if (React.isValidElement(this.props.children)) {
      return cloneElement(this.props.children, {className: newClassName})
    }

    return <span className={newClassName}>{this.props.children}</span>
  }
}
