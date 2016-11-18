import React, {PropTypes} from 'react'
import {Row} from './grid'
import classNames from 'classnames'

const BOOL_PROP_MAPPINGS = {
  collapse: 'collapse',
  smallUnstack: 'small-unstack',
  mediumUnstack: 'medium-unstack',
  largeUnstack: 'large-unstack',
  alignRight: 'align-right',
  alignCenter: 'align-center',
  alignJustify: 'align-justify',
  alignSpaced: 'align-spaced',
  alignTop: 'align-top',
  alignMiddle: 'align-middle',
  alignStretch: 'align-stretch',
  smallCollapse: 'small-collapse',
  mediumCollapse: 'medium-collapse',
  largeCollapse: 'large-collapse',
  smallUncollapse: 'small-uncollapse',
  mediumUncollapse: 'medium-uncollapse',
  largeUncollapse: 'large-uncollapse',
}

const NUMBER_PROP_MAPPINGS = {
  small: (x) => `small-${x}`,
  medium: (x) => `medium-${x}`,
  large: (x) => `large-${x}`,
  smallUp: (x) => `small-up-${x}`,
  mediumUp: (x) => `medium-up-${x}`,
  largeUp: (x) => `large-up-${x}`,
}

const NUMBER_PROPS = Object.keys(NUMBER_PROP_MAPPINGS)
const BOOL_PROPS = Object.keys(BOOL_PROP_MAPPINGS)

const PROP_TYPES = {
  children: PropTypes.element,
}

BOOL_PROPS.forEach((x) => PROP_TYPES[x] = React.PropTypes.bool)
NUMBER_PROPS.forEach((x) => PROP_TYPES[x] = React.PropTypes.oneOf([
  1, '1',
  2, '2',
  3, '3',
  4, '4',
  5, '5',
  6, '6',
  7, '7',
  8, '8',
  9, '9',
  10, '10',
  11, '11',
  12, '12',
]))

function getBoolClassNames(props) {
  return BOOL_PROPS
    .filter((prop) => props[prop])
    .map((prop) => BOOL_PROP_MAPPINGS[prop])
}

function getNumberClassNames(props) {
  return NUMBER_PROPS
    .filter((prop) => props[prop])
    .map((prop) => NUMBER_PROP_MAPPINGS[prop](props[prop]))
}

export default class FlexRow extends Row {
  get className() {
    return classNames(
      'row revRow',
      this.props.className,
      getBoolClassNames(this.props),
      getNumberClassNames(this.props)
    )
  }

  render() {
    console.log('dingus')
    return <div {...this.props} className={this.className}>
      {this.props.children}
    </div>
  }
}

FlexRow.propTypes = PROP_TYPES
