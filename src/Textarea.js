import React from 'react'
import _ from 'underscore'
import classNames from 'classnames'
import Input from './Input'

export default class Textarea extends React.Component {
  render() {
    let className = classNames(this.props.className, {
      'RevTextarea': true,
    })
    let props = _.omit(['type'])
    return <Input {...props}
      className={className}
      dom="textarea"
    />
  }
}
