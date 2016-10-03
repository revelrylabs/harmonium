import React from 'react'
import _ from 'underscore'
import classNames from 'classnames'

export default class Switch extends React.Component {

  get id() {
    // Use a props-provided ID if there is one.
    if(this.props.id != null) {
      return this.props.id
    }
    // Otherwise use a memoized generated unique ID.
    if(this._id == null) {
      this._id = _.uniqueId()
    }
    return this._id
  }

  get className() {
    return classNames(this.props.className, {
      'RevSwitch': true,
      'switch': true,
    })
  }

  get inputProps() {
    return _.omit(['className'])
  }

  render() {
    return <div className={this.className}>
      <input {...this.inputProps} id={this.id} type="checkbox" />
      <label htmlFor={this.id} />
    </div>
  }
}
