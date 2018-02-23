import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import { defaultTo, has, reduce } from 'lodash'

const PROP_TYPES = {
  children: PropTypes.element,
  color: PropTypes.string,
  duration: PropTypes.string,
  huge: PropTypes.bool,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  secondaryColor: PropTypes.string,
  size: PropTypes.string,
  small: PropTypes.bool
}

/*
 * Increment.
 * Provided a number, returns its value, incremented by one.
 **/
function inc(num) {
  return num + 1
}

export default class Loader extends Component {
  static propTypes = PROP_TYPES

  /*
   * Sum properties in object.
   * Provided a list of attributes, and provided an object, returns an integer
   * representing the total number of attributes encompassed by the object.
   **/
  sumPropsInObj(attrs = [], obj = {}) {
    return reduce(attrs, (acc, curr) => (has(obj, curr) ? inc(acc) : acc), 0)
  }

  ensureNoConflicts(props = {}) {
    const sizeRelatedProps = ['huge', 'large', 'medium', 'size', 'small']
    const sum = this.sumPropsInObj(sizeRelatedProps, props)

    if (sum > 1) {
      throw Error(
        `You have specified more than one of the following size-related props:
        small, medium, large, huge, size. Only one of these props may be 
        specified per each component instance.`
      )
    }
  }

  // .Loader {
  // @include loader02($align: center);
  // }

  // .Loader--small {
  // @include loader02($align: center, $size: 17px, $color: $white, $border-size: 2px);
  // }

  // .Loader--middle {
  // @include loader02($align: middle);
  // }

  // .Loader--large {
  // @include loader02($align: center, $size: 88px, $border-size: 12px);
  // }
  resolveStyles(props = {}) {
    const small = props.small ? { borderWidth: '2', height: '17px', width: '17px' } : {}
    const medium = props.medium ? { borderWidth: '12', height: '88px', width: '88px' } : {}
    const huge = props.huge ? { borderWidth: '16', height: '120px', width: '120px' } : {}
    let styles = {
      animationDuration: props.duration,
      // border: 16px solid #f3f3f3,
      // borderTop: '16px solid #3498db,
      // borderColor: 'green',
      // borderTopColor: 'red',
      borderWidth: '12px',
      height: props.size,
      width: props.size
    }
    styles = { ...style, ...small, ...medium, ...large, ...huge }

    return styles
  }

  render() {
    const { className, ...props } = this.props
    const styles = this.resolveStyles(props)
    this.ensureNoConflicts(props)

    return (
      <div className="rev-Loader" style={styles}>
        {props.children}
      </div>
    )
  }
}
