import React, {Component} from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  collapse: ['rev-Row--collapse'],
  smallCollapse: ['rev-Row--smallCollapse'],
  mediumCollapse: ['rev-Row--mediumCollapse'],
  largeCollapse: ['rev-Row--largeCollapse'],
  xlargeCollapse: ['rev-Row--xlargeCollapse'],
  xxlargeCollapse: ['rev-Row--xxlargeCollapse'],

  uncollapse: ['rev-Row--uncollapse'],
  smallUncollapse: ['rev-Row--smallUncollapse'],
  mediumUncollapse: ['rev-Row--mediumUncollapse'],
  largeUncollapse: ['rev-Row--largeUncollapse'],
  xlargeUncollapse: ['rev-Row--xlargeUncollapse'],
  xxlargeUncollapse: ['rev-Row--xxlargeUncollapse'],

  flex: ['rev-Row--flex'],
  smallFlex: ['rev-Row--smallFlex'],
  mediumFlex: ['rev-Row--mediumFlex'],
  largeFlex: ['rev-Row--largeFlex'],
  xlargeFlex: ['rev-Row--xlargeFlex'],
  xxlargeFlex: ['rev-Row--xxlargeFlex'],

  unflex: ['rev-Row--unflex'],
  smallUnflex: ['rev-Row--smallUnflex'],
  mediumUnflex: ['rev-Row--mediumUnflex'],
  largeUnflex: ['rev-Row--largeUnflex'],
  xlargeUnflex: ['rev-Row--xlargeUnflex'],
  xxlargeUnflex: ['rev-Row--xxlargeUnflex'],

  smallUnstack: ['rev-Row--smallUnstack'],
  mediumUnstack: ['rev-Row--mediumUnstack'],
  largeUnstack: ['rev-Row--largeUnstack'],
  xlargeUnstack: ['rev-Row--xlargeUnstack'],
  xxlargeUnstack: ['rev-Row--xxlargeUnstack'],

  right: ['rev-Row--right'],
  center: ['rev-Row--center'],
  justify: ['rev-Row--justify'],
  spaced: ['rev-Row--spaced'],
  top: ['rev-Row--top'],
  middle: ['rev-Row--middle'],
  bottom: ['rev-Row--bottom'],
  stretch: ['rev-Row--stretch'],
  flex: ['rev-Row--flex'],
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

const NUMBER_PROPS_TO_CLASS_NAMES = {
  smallUp: (x) => [`rev-Row--smallUp${x}`],
  mediumUp: (x) => [`rev-Row--mediumUp${x}`],
  largeUp: (x) => [`rev-Row--largeUp${x}`],
  xlargeUp: (x) => [`rev-Row--xlargeUp${x}`],
  xxlargeUp: (x) => [`rev-Row--xxlargeUp${x}`],
}

const NUMBER_PROPS = Object.keys(NUMBER_PROPS_TO_CLASS_NAMES)

export default class Row extends React.Component {
  render() {
    const {children, className, ...props} = this.props

    const boolClassNames = []

    BOOL_PROPS.forEach((name) => {
      if (props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
    })

    const numberClassNames = []

    NUMBER_PROPS.forEach((name) => {
      const value = props[name]
      const fn = NUMBER_PROPS_TO_CLASS_NAMES[name]

      if (value != null) {
        numberClassNames.push(fn(value))
      }
      delete props[name]
    })

    const divClassName = classNames(className, 'rev-Row', boolClassNames, numberClassNames)

    return (
      <div {...props} className={divClassName}>
        {children}
      </div>
    )
  }
}
