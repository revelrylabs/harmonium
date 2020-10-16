import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  // row width 100%
  expand: ['rev-Row--expand'],
  smallExpand: ['rev-Row--smallExpand'],
  mediumExpand: ['rev-Row--mediumExpand'],
  largeExpand: ['rev-Row--largeExpand'],
  xlargeExpand: ['rev-Row--xlargeExpand'],
  xxlargeExpand: ['rev-Row--xxlargeExpand'],
  
  // zeros out padding on direct child cols
  collapse: ['rev-Row--collapse'],
  smallCollapse: ['rev-Row--smallCollapse'],
  mediumCollapse: ['rev-Row--mediumCollapse'],
  largeCollapse: ['rev-Row--largeCollapse'],
  xlargeCollapse: ['rev-Row--xlargeCollapse'],
  xxlargeCollapse: ['rev-Row--xxlargeCollapse'],

  // resets padding on direct child cols
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

  // flex grid props affecting child cols
  directionCol: ['rev-Row--directionCol'],

  justifyStart: ['rev-Row--justifyStart'],
  justifyEnd: ['rev-Row--justifyEnd'],
  justifyCenter: ['rev-Row--justifyCenter'],
  justifySpaceAround: ['rev-Row--justifySpaceAround'],
  justifySpaceBetween: ['rev-Row--justifySpaceBetween'],

  alignStart: ['rev-Row--alignStart'],
  alignEnd: ['rev-Row--alignEnd'],
  alignCenter: ['rev-Row--alignCenter'],
  alignBaseline: ['rev-Row--alignBaseline'],
  alignStretch: ['rev-Row--alignStretch'],
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

const NUMBER_PROPS_TO_CLASS_NAMES = {
  smallUp: (arg) => [`rev-Row--smallUp${arg}`],
  mediumUp: (arg) => [`rev-Row--mediumUp${arg}`],
  largeUp: (arg) => [`rev-Row--largeUp${arg}`],
  xlargeUp: (arg) => [`rev-Row--xlargeUp${arg}`],
  xxlargeUp: (arg) => [`rev-Row--xxlargeUp${arg}`],
}

const NUMBER_PROPS = Object.keys(NUMBER_PROPS_TO_CLASS_NAMES)

export default class Row extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

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
      const func = NUMBER_PROPS_TO_CLASS_NAMES[name]

      if (value != null) {
        numberClassNames.push(func(value))
      }
      delete props[name]
    })

    const divClassName = classNames(
      className,
      'rev-Row',
      boolClassNames,
      numberClassNames
    )

    return (
      <div {...props} className={divClassName}>
        {children}
      </div>
    )
  }
}
