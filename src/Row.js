import React, {Component} from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  collapse: 'collapse',

  smallCollapse: 'small-collapse',
  mediumCollapse: 'medium-collapse',
  largeCollapse: 'large-collapse',

  smallUncollapse: 'small-uncollapse',
  mediumUncollapse: 'medium-uncollapse',
  largeUncollapse: 'large-uncollapse',
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

const NUMBER_PROPS_TO_CLASS_NAMES = {
  smallUp: (x) => `small-up-${x}`,
  mediumUp: (x) => `medium-up-${x}`,
  largeUp: (x) => `large-up-${x}`,
}

const NUMBER_PROPS = Object.keys(NUMBER_PROPS_TO_CLASS_NAMES)

export default class Row extends React.Component {
  render() {
    const {children, className, ...props} = this.props

    const boolClassNames = []
    BOOL_PROPS.forEach((name) => {
      if(props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name] )
      }
      delete props[name]
    })

    const numberClassNames = []
    NUMBER_PROPS.forEach((name) => {
      const value = props[name]
      const fn = NUMBER_PROPS_TO_CLASS_NAMES[name]
      if(value != null) {
        numberClassNames.push(fn(value))
      }
      delete props[name]
    })

    const divClassName = classNames(
      className,
      'row',
      boolClassNames,
      numberClassNames,
    )

    return (
      <div {...props} className={divClassName}>
        {children}
      </div>
    )
  }
}
