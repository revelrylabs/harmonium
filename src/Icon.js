import React from 'react'
import classNames from 'classnames'
import _ from 'underscore'

const ADAPTERS = {
  FontAwesome: function(icon) { return `fa fa-${icon}` },
  IcoMoon: function(icon) { return `icon-${icon}` },
  Foundation: function(icon) { return `fi-${icon}` },
}

export default class Icon extends React.Component {

  static get defaultType() {
    return this._defaultType || 'IcoMoon'
  }

  static set defaultType(value) {
    this._defaultType = value
  }

  static get propTypes() {
    return {
      icon: React.PropTypes.string.isRequired,
      type: React.PropTypes.string,
    }
  }

  static get defaultProps() {
    return {
      type: this.defaultType,
    }
  }

  constructor(props) {
    super(props)
  }

  get adapter() {
    return ADAPTERS[this.props.type]
  }

  get iconSpecificClassName() {
    return this.adapter(this.props.icon)
  }

  get className() {
    let classNameObject = {
      'RevIcon': true
    }
    classNameObject[`RevIcon-${this.props.icon}`] = true
    classNameObject[this.iconSpecificClassName] = true
    return classNames(this.props.className, classNameObject)
  }

  get passThroughProps() {
    return _.omit([
      'icon',
      'type',
    ])
  }

  render() {
    return <i {...this.props} className={this.className} />
  }

}
