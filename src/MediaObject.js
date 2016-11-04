import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import _ from 'underscore'

const PARENT_CLASS_NAMES = {
  stackForSmall: 'stack-for-small',
  stackForMedium: 'stack-for-medium',
  stackForLarge: 'stack-for-large',

  alignBottom: 'align-bottom',
  alignCenter: 'align-center',
  alignMiddle: 'align-middle',
  alignTop: 'align-top',
}

const PARENT_PROP_TYPES = {
  children: PropTypes.node,
}
Object.keys(PARENT_CLASS_NAMES).forEach(key => PARENT_PROP_TYPES[key] = PropTypes.bool)

export class MediaObject extends Component {
  static propTypes = PARENT_PROP_TYPES

  get classNamesList() {
    const classNamesList = ['media-object']
    Object.keys(this.props).forEach(propName => {
      const className = PARENT_CLASS_NAMES[propName]
      if (className) {
        classNamesList.push(className)
      }
    })

    return classNamesList
  }

  render() {
    const {className, ...props} = this.props
    const classNamesList = classNames(this.classNamesList, className)
    const passThroughProps = _.omit(props, this.classNamesList)

    return <div {...passThroughProps} className={classNamesList}>
      {this.props.children}
    </div>
  }
}

const SECTION_CLASS_NAMES = {
  mainSection: 'main-section',

  bottom: 'bottom',
  middle: 'middle',
  top: 'top',

  alignBottom: 'align-bottom',
  alignCenter: 'align-center',
  alignMiddle: 'align-middle',
  alignTop: 'align-top',

  alignSelfBottom: 'align-self-bottom',
  alignSelfCenter: 'align-self-center',
  alignSelfMiddle: 'align-self-middle',
  alignSelfTop: 'align-self-top',
}

const SECTION_PROP_TYPES = {
  children: PropTypes.node,
}
Object.keys(SECTION_CLASS_NAMES).forEach(key => SECTION_PROP_TYPES[key] = PropTypes.bool)

export class MediaObjectSection extends Component {
  static propTypes = SECTION_PROP_TYPES

  get classNamesList() {
    const classNamesList = ['media-object-section']
    Object.keys(this.props).forEach(propName => {
      const className = SECTION_CLASS_NAMES[propName]
      if (className) {
        classNamesList.push(className)
      }
    })

    return classNamesList
  }

  render() {
    const {className, ...props} = this.props
    const classNamesList = classNames(this.classNamesList, className)
    const passThroughProps = _.omit(props, this.classNamesList)

    return <div {...passThroughProps} className={classNamesList}>
      {this.props.children}
    </div>
  }
}
