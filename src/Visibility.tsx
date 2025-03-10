import React, {Component, cloneElement, ReactNode, ReactElement} from 'react'
import classNames from 'classnames'

const CLASS_NAMES: Record<string, string> = {
  showForSmall: 'Show--smallUp',
  showForMedium: 'Show--mediumUp',
  showForLarge: 'Show--largeUp',
  showForXlarge: 'Show--xlargeUp',
  showForXxlarge: 'Show--xxlargeUp',

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

export interface VisibilityProps {
  className?: string;
  children?: ReactNode;
  showForSmall?: boolean;
  showForMedium?: boolean;
  showForLarge?: boolean;
  showForXlarge?: boolean;
  showForXxlarge?: boolean;
  showForSmallOnly?: boolean;
  showForMediumOnly?: boolean;
  showForLargeOnly?: boolean;
  showForXlargeOnly?: boolean;
  showForXxlargeOnly?: boolean;
  hideForSmall?: boolean;
  hideForMedium?: boolean;
  hideForLarge?: boolean;
  hideForXlarge?: boolean;
  hideForXxlarge?: boolean;
  hideForSmallOnly?: boolean;
  hideForMediumOnly?: boolean;
  hideForLargeOnly?: boolean;
  hideForXlargeOnly?: boolean;
  hideForXxlargeOnly?: boolean;
  hiddenForSmall?: boolean;
  hiddenForMedium?: boolean;
  hiddenForLarge?: boolean;
  hiddenForXlarge?: boolean;
  hiddenForXxlarge?: boolean;
  hiddenForSmallOnly?: boolean;
  hiddenForMediumOnly?: boolean;
  hiddenForLargeOnly?: boolean;
  hiddenForXlargeOnly?: boolean;
  hiddenForXxlargeOnly?: boolean;
  [key: string]: any;
}

/**
 * Visibility component for controlling element visibility based on breakpoints
 */
export default class Visibility extends Component<VisibilityProps> {
  render() {
    const classNamesList = [this.props.className].filter(Boolean)

    Object.keys(this.props).forEach((propName) => {
      const className = CLASS_NAMES[propName]

      if (className && this.props[propName] === true) {
        classNamesList.push(className)
      }
    })

    const newClassName = classNames(classNamesList)

    if (React.isValidElement(this.props.children)) {
      return cloneElement(this.props.children as ReactElement, {className: newClassName})
    }

    return <span className={newClassName}>{this.props.children}</span>
  }
} 