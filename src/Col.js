import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  smallCentered: ['small-centered', 'rev-Col--smallCentered'],
  mediumCentered: ['medium-centered', 'rev-Col--mediumCentered'],
  largeCentered: ['large-centered', 'rev-Col--largeCentered'],

  smallUncentered: ['small-uncentered', 'rev-Col--smallUncentered'],
  mediumUncentered: ['medium-uncentered', 'rev-Col--mediumUncentered'],
  largeUncentered: ['large-uncentered', 'rev-Col--largeUncentered'],

  mediumExpand: ['medium-expand', 'rev-Col--mediumExpand'],
  largeExpand: ['large-expand', 'rev-Col--largeExpand'],

  end: ['end', 'rev-Col--end'],

  expanded: ['expanded', 'rev-Col--expanded'],

  shrink: ['shrink', 'rev-Col--shrink'],

  left: ['align-self-left', 'rev-Col--left'],
  right: ['align-self-right', 'rev-Col--right'],
  center: ['align-self-center', 'rev-Col--center'],
  justify: ['align-self-justify', 'rev-Col--justify'],
  spaced: ['align-self-spaced', 'rev-Col--spaced'],
  top: ['align-self-top', 'rev-Col--top'],
  middle: ['align-self-middle', 'rev-Col--middle'],
  bottom: ['align-self-bottom', 'rev-Col--bottom'],
  stretch: ['align-self-stretch', 'rev-Col--stretch'],
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

const NUMBER_PROPS_TO_CLASS_NAMES = {
  small: (arg) => [`small-${arg}`, `rev-Col--small${arg}`],
  medium: (arg) => [`medium-${arg}`, `rev-Col--medium${arg}`],
  large: (arg) => [`large-${arg}`, `rev-Col--large${arg}`],
  xlarge: (arg) => [`xlarge-${arg}`, `rev-Col--xlarge${arg}`],
  xxlarge: (arg) => [`xxlarge-${arg}`, `rev-Col--xxlarge${arg}`],

  smallOffset: (arg) => [`small-offset-${arg}`, `rev-Col--smallOffset${arg}`],
  mediumOffset: (arg) => [`medium-offset-${arg}`, `rev-Col--mediumOffset${arg}`],
  largeOffset: (arg) => [`large-offset-${arg}`, `rev-Col--largeOffset${arg}`],

  smallPush: (arg) => [`small-push-${arg}`, `rev-Col--smallPush${arg}`],
  mediumPush: (arg) => [`medium-push-${arg}`, `rev-Col--mediumPush${arg}`],
  largePush: (arg) => [`large-push-${arg}`, `rev-Col--largePush${arg}`],

  smallPull: (arg) => [`small-pull-${arg}`, `rev-Col--smallPull${arg}`],
  mediumPull: (arg) => [`medium-pull-${arg}`, `rev-Col--mediumPull${arg}`],
  largePull: (arg) => [`large-pull-${arg}`, `rev-Col--largePull${arg}`],

  smallOrder: (arg) => [`small-order-${arg}`, `rev-Col--smallOrder${arg}`],
  mediumOrder: (arg) => [`medium-order-${arg}`, `rev-Col--mediumOrder${arg}`],
  largeOrder: (arg) => [`large-order-${arg}`, `rev-Col--largeOrder${arg}`],
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

      if (value !== null) {
        numberClassNames.push(func(value))
      }
      delete props[name]
    })

    const divClassName = classNames(
      className,
      'columns',
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
