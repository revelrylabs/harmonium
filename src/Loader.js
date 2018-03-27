import React, {Component} from 'react'
// import classNames from 'classnames'
import {omit, gt, has, reduce, without} from 'lodash'

/*
 * Size-related props.
 * Itemizes style configurations for the various size props that may be passed.
 **/
const sizeRelatedProps = ['huge', 'large', 'medium', 'size', 'small']

/*
 * Increment.
 * Provided a number, returns its value, incremented by one.
 **/
function inc(num = 0) {
  return num + 1
}

export default class Loader extends Component {
  /*
   * Sum properties in object.
   * Provided a list of attributes, and provided an object, returns an integer
   * representing the total number of attributes encompassed by the object.
   **/
  sumPropsInObj(attrs = [], obj = {}) {
    return reduce(attrs, (acc, curr) => (has(obj, curr) ? inc(acc) : acc), 0)
  }

  /*
   * Ensure no prop conflicts.
   * Verifies that developer has not passed any conflicting props. Provided so,
   * throws an error.
   **/
  ensureNoConflicts(props = {}) {
    const sum = this.sumPropsInObj(sizeRelatedProps, props)

    if (gt(sum, 1)) {
      throw Error(
        `You have specified more than one of the following size-related props:
        small, medium, large, huge, size. Only one of these props may be
        specified per each component instance.`
      )
    }
  }

  // omitUndefinedProps(obj = {}) {
  //   return reduce(obj, (acc, curr) => isUndefined(curr) ? omit(obj, curr)), {})
  // }

  resolveClassNames(props = {}) {
    const classes = without(sizeRelatedProps, 'size')

    return reduce(
      classes,
      (acc, curr) => (props[curr] ? acc.concat(`rev-Loader--${curr}`) : acc),
      ''
    )
  }

  resolveStyles(props = {}) {
    const styles = {
      animationDuration: props.duration,
      borderColor: props.secondaryColor,
      borderTopColor: props.color,
      borderWidth: props.borderWidth,
      height: props.size,
      width: props.size,
    }
    const overrides = props.style || {}

    return {...styles, ...overrides}
  }

  render() {
    const props = omit(this.props, 'className')

    this.ensureNoConflicts(props)

    const classes = this.resolveClassNames(props)
    const styles = this.resolveStyles(props)

    return (
      <div className={`rev-Loader ${classes}`} style={styles}>
        {props.children}
      </div>
    )
  }
}
