import React from 'react'
import Input from './Input'

export default class Select extends React.Component {
  render() {
    return <Input {...this.props} dom="select">
      {this.props.children}
    </Input>
  }
}
