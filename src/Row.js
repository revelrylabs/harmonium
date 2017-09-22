import React, {Component} from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  collapse: ['collapse', 'rev-Row--collapse'],

  smallCollapse: ['small-collapse', 'rev-Row--smallCollapse'],
  mediumCollapse: ['medium-collapse', 'rev-Row--mediumCollapse'],
  largeCollapse: ['large-collapse', 'rev-Row--largeCollapse'],

  smallUncollapse: ['small-uncollapse', 'rev-Row--smallUncollapse'],
  mediumUncollapse: ['medium-uncollapse', 'rev-Row--mediumUncollapse'],
  largeUncollapse: ['large-uncollapse', 'rev-Row--largeUncollapse'],

  smallUnstack: ['small-unstack', 'rev-Row--smallUnstack'],
  mediumUnstack: ['medium-unstack', 'rev-Row--mediumUnstack'],
  largeUnstack: ['large-unstack', 'rev-Row--largeUnstack'],

  right: ['align-right', 'rev-Row--right'],
  center: ['align-center', 'rev-Row--center'],
  justify: ['align-justify', 'rev-Row--justify'],
  spaced: ['align-spaced', 'rev-Row--spaced'],
  top: ['align-top', 'rev-Row--top'],
  middle: ['align-middle', 'rev-Row--middle'],
  bottom: ['align-bottom', 'rev-Row--bottom'],
  stretch: ['align-stretch', 'rev-Row--stretch'],
  flex: ['rev-Row--flex'],
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

const NUMBER_PROPS_TO_CLASS_NAMES = {
  smallUp: (x) => [`small-up-${x}`, `rev-Row--smallUp${x}`],
  mediumUp: (x) => [`medium-up-${x}`, `rev-Row--mediumUp${x}`],
  largeUp: (x) => [`large-up-${x}`, `rev-Row--largeUp${x}`],
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
      'rev-Row',
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
