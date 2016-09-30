import React from 'react'
import classNames from 'classNames'
import _ from 'underscore'

export default class Icon extends React.Component {

  static get Adapters() {
    return this._Adapters = this._Adapters || {
      FontAwesome: function(icon) { return `fa fa-${icon}` },
      IconMoon: function(icon) {
        console.warn('The IconMoon adapter is deprecated. Why? Because the name of the lib is *IcoMoon*. Use that.')
        return `icon-${icon}`
      },
      IcoMoon: function(icon) { return `icon-${icon}` },
      Foundation: function(icon) { return `fi-${icon}` },
    }
  }

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
    return this.constructor.Adapters[this.props.type]
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
