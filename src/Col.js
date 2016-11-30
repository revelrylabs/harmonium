import React, {Component} from 'react'
import classNames from 'classnames'
import Row from './Row'

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
  small: (x) => [`small-${x}`, `rev-Col--small${x}`],
  medium: (x) => [`medium-${x}`, `rev-Col--medium${x}`],
  large: (x) => [`large-${x}`, `rev-Col--large${x}`],

  smallOffset: (x) => [`small-offset-${x}`, `rev-Col--smallOffset${x}`],
  mediumOffset: (x) => [`medium-offset-${x}`, `rev-Col--mediumOffset${x}`],
  largeOffset: (x) => [`large-offset-${x}`, `rev-Col--largeOffset${x}`],

  smallPush: (x) => [`small-push-${x}`, `rev-Col--smallPush${x}`],
  mediumPush: (x) => [`medium-push-${x}`, `rev-Col--mediumPush${x}`],
  largePush: (x) => [`large-push-${x}`, `rev-Col--largePush${x}`],

  smallPull: (x) => [`small-pull-${x}`, `rev-Col--smallPull${x}`],
  mediumPull: (x) => [`medium-pull-${x}`, `rev-Col--mediumPull${x}`],
  largePull: (x) => [`large-pull-${x}`, `rev-Col--largePull${x}`],

  smallOrder: (x) => [`small-order-${x}`, `rev-Col--smallOrder${x}`],
  mediumOrder: (x) => [`medium-order-${x}`, `rev-Col--mediumOrder${x}`],
  largeOrder: (x) => [`large-order-${x}`, `rev-Col--largeOrder${x}`],
}

const NUMBER_PROPS = Object.keys(NUMBER_PROPS_TO_CLASS_NAMES)

export default class Col extends Component {
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
      'columns',
      'rev-Col',
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
