import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'

const PROP_TYPES = {
  children: PropTypes.element,
  color: PropTypes.string,
  duration: PropTypes.string,
  large: PropTypes.bool,
  secondaryColor: PropTypes.string,
  small: PropTypes.bool
}

export default class Loader extends Component {
  static propTypes = PROP_TYPES

  ensureNoConflicts(props) {
    if (props.small && props.large) {
      throw Error(
        'You have specified both small={true} and large={true}. Only one may be specified.'
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
  resolveStyles() {}

  render() {
    const { className, ...props } = this.props
    const style = {
      animationDuration: props.duration,
      // border: 16px solid #f3f3f3,
      // borderTop: '16px solid #3498db,
      // borderColor: 'green',
      // borderTopColor: 'red',
      borderWidth: '12',
      height: '88px',
      width: '88px'
    }

    // const classNamesList = classNames('rev-CloseButton', className)

    return <div className="rev-Loader" style={style} />
  }
}
