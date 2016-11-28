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

  smallUnstack: 'small-unstack',
  mediumUnstack: 'medium-unstack',
  largeUnstack: 'large-unstack',
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

const NUMBER_PROPS_TO_CLASS_NAMES = {
  smallUp: (x) => `small-up-${x}`,
  mediumUp: (x) => `medium-up-${x}`,
  largeUp: (x) => `large-up-${x}`,
}

const NUMBER_PROPS = Object.keys(NUMBER_PROPS_TO_CLASS_NAMES)

const HORIZONTAL_ALIGNMENTS = {
  right: true,
  center: true,
  justify: true,
  spaced: true,
}

const VERTICAL_ALIGNMENTS = {
  top: true,
  middle: true,
  bottom: true,
  stretch: true,
}

function getAlignmentClassNames(hAlign, vAlign) {
  const names = []
  if(hAlign && HORIZONTAL_ALIGNMENTS[hAlign]) {
    names.push(`align-${hAlign}`)
  }
  if(vAlign && VERTICAL_ALIGNMENTS[vAlign]) {
    names.push(`align-${vAlign}`)
  }
  return names
}

export default class Row extends React.Component {
  render() {
    const {children, className, hAlign, vAlign, ...props} = this.props

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
      getAlignmentClassNames(hAlign, vAlign)
    )

    return (
      <div {...props} className={divClassName}>
        {children}
      </div>
    )
  }
}
