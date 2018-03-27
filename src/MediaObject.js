import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'underscore'

const PARENT_CLASS_NAMES = {
  stackForSmall: ['stack-for-small', 'rev-MediaObject--stackForSmall'],
  stackForMedium: ['stack-for-medium', 'rev-MediaObject--stackForMedium'],
  stackForLarge: ['stack-for-large', 'rev-MediaObject--stackForLarge'],

  right: ['align-right', 'rev-MediaObject--right'],
  center: ['align-center', 'rev-MediaObject--center'],
  justify: ['align-justify', 'rev-MediaObject--justify'],
  spaced: ['align-spaced', 'rev-MediaObject--spaced'],
  top: ['align-top', 'rev-MediaObject--top'],
  middle: ['middle', 'align-middle', 'rev-MediaObject--middle'],
  bottom: ['bottom', 'align-bottom', 'rev-MediaObject--bottom'],
  stretch: ['align-stretch', 'rev-MediaObject--stretch'],
}

const PARENT_PROP_TYPES = {
  children: PropTypes.node,
}

Object.keys(PARENT_CLASS_NAMES).forEach((key) => PARENT_PROP_TYPES[key] = PropTypes.bool)

export default class MediaObject extends Component {
  static propTypes = PARENT_PROP_TYPES

  render() {
    // Extract props that won't pass through
    const {className, children, ...props} = this.props

    // Start building the className
    const classNameList = []

    Object.keys(PARENT_CLASS_NAMES).forEach((name) => {
      if (props[name]) {
        classNameList.push(PARENT_CLASS_NAMES[name])
      }
      delete props[name]
    })

    // Finish building the className
    const mediaObjectClassNames = classNames(
      classNameList,
      'media-object',
      'rev-MediaObject',
      className
    )

    return (
      <div {...props} className={mediaObjectClassNames}>
        {this.props.children}
      </div>
    )
  }
}

const SECTION_CLASS_NAMES = {
  main: ['main-section', 'rev-MediaObject-section--main'],

  right: ['align-self-right', 'rev-MediaObject-section--right'],
  center: ['align-self-center', 'rev-MediaObject-section--center'],
  justify: ['align-self-justify', 'rev-MediaObject-section--justify'],
  spaced: ['align-self-spaced', 'rev-MediaObject-section--spaced'],
  top: ['align-self-top', 'rev-MediaObject-section--top'],
  middle: ['middle', 'align-self-middle', 'rev-MediaObject-section--middle'],
  bottom: ['bottom', 'align-self-bottom', 'rev-MediaObject-section--bottom'],
  stretch: ['align-self-stretch', 'rev-MediaObject-section--stretch'],
}

const SECTION_PROP_TYPES = {
  children: PropTypes.node,
}

Object.keys(SECTION_CLASS_NAMES).forEach((key) => SECTION_PROP_TYPES[key] = PropTypes.bool)

class MediaObjectSection extends Component {
  static propTypes = SECTION_PROP_TYPES

  render() {
    // Extract props that won't pass through
    const {className, children, ...props} = this.props

    // Start building the className
    const classNameList = []

    Object.keys(SECTION_CLASS_NAMES).forEach((name) => {
      if (props[name]) {
        classNameList.push(SECTION_CLASS_NAMES[name])
      }
      delete props[name]
    })

    // Finish building the className
    const sectionClassNames = classNames(
      classNameList,
      'media-object-section',
      'rev-MediaObject-section',
      className

    return (
      <div {...props} className={sectionClassNames}>
        {children}
      </div>
    )
  }
}
MediaObject.Section = MediaObjectSection
