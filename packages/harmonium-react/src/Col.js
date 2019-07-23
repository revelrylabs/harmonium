import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  // props for float grid
  smallCentered: ['rev-Col--smallCentered'],
  mediumCentered: ['rev-Col--mediumCentered'],
  largeCentered: ['rev-Col--largeCentered'],
  xlargeCentered: ['rev-Col--xlargeCentered'],
  xxlargeCentered: ['rev-Col--xxlargeCentered'],

  smallUncentered: ['rev-Col--smallUncentered'],
  mediumUncentered: ['rev-Col--mediumUncentered'],
  largeUncentered: ['rev-Col--largeUncentered'],
  xlargeUncentered: ['rev-Col--xlargeUncentered'],
  xxlargeUncentered: ['rev-Col--xxlargeUncentered'],

  end: ['rev-Col--end'],

  // padding props for float or flex grid
  collapse: ['rev-Col--collapse'],
  mediumCollapse: ['rev-Col--mediumCollapse'],
  largeCollapse: ['rev-Col--largeCollapse'],
  xlargeCollapse: ['rev-Col--xlargeCollapse'],
  xxlargeCollapse: ['rev-Col--xxlargeCollapse'],

  uncollapse: ['rev-Col--uncollapse'],
  mediumUncollapse: ['rev-Col--mediumUncollapse'],
  largeUncollapse: ['rev-Col--largeUncollapse'],
  xlargeUncollapse: ['rev-Col--xlargeUncollapse'],
  xxlargeUncollapse: ['rev-Col--xxlargeUncollapse'],

  // width props for flex grid
  shrink: ['rev-Col--shrink'],

  // align-self props for flex grid
  alignStart: ['rev-Col--alignStart'],
  alignEnd: ['rev-Col--alignEnd'],
  alignCenter: ['rev-Col--alignCenter'],
  alignBaseline: ['rev-Col--alignBaseline'],
  alignStretch: ['rev-Col--alignStretch'],
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

const NUMBER_PROPS_TO_CLASS_NAMES = {
  small: (arg) => [`rev-Col--small${arg}`],
  medium: (arg) => [`rev-Col--medium${arg}`],
  large: (arg) => [`rev-Col--large${arg}`],
  xlarge: (arg) => [`rev-Col--xlarge${arg}`],
  xxlarge: (arg) => [`rev-Col--xxlarge${arg}`],

  smallOffset: (arg) => [`rev-Col--smallOffset${arg}`],
  mediumOffset: (arg) => [`rev-Col--mediumOffset${arg}`,],
  largeOffset: (arg) => [`rev-Col--largeOffset${arg}`],
  xlargeOffset: (arg) => [`rev-Col--xlargeOffset${arg}`],
  xxlargeOffset: (arg) => [`rev-Col--xxlargeOffset${arg}`],

  smallPush: (arg) => [`rev-Col--smallPush${arg}`],
  mediumPush: (arg) => [`rev-Col--mediumPush${arg}`],
  largePush: (arg) => [`rev-Col--largePush${arg}`],
  xlargePush: (arg) => [`rev-Col--xlargePush${arg}`],
  xxlargePush: (arg) => [`rev-Col--xxlargePush${arg}`],

  smallPull: (arg) => [`rev-Col--smallPull${arg}`],
  mediumPull: (arg) => [`rev-Col--mediumPull${arg}`],
  largePull: (arg) => [`rev-Col--largePull${arg}`],
  xlargePull: (arg) => [`rev-Col--xlargePull${arg}`],
  xxlargePull: (arg) => [`rev-Col--xxlargePull${arg}`],

  smallOrder: (arg) => [`rev-Col--smallOrder${arg}`],
  mediumOrder: (arg) => [`rev-Col--mediumOrder${arg}`],
  largeOrder: (arg) => [`rev-Col--largeOrder${arg}`],
  xlargeOrder: (arg) => [`rev-Col--xlargeOrder${arg}`],
  xxlargeOrder: (arg) => [`rev-Col--xxlargeOrder${arg}`],
}

const NUMBER_PROPS = Object.keys(NUMBER_PROPS_TO_CLASS_NAMES)

export default class Col extends Component {
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
      'rev-Col',
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
