import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'

const PROP_TYPES = {
  children: PropTypes.node
}

export default class Loader extends Component {
  static propTypes = PROP_TYPES

  render() {
    const { className, ...props } = this.props
    // const classNamesList = classNames('rev-CloseButton', className)

    return <p>Hello, I am a Loader.</p>
  }
}
