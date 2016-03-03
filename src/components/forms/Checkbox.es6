import React from 'react'
import Input from './Input'

export default class Checkbox extends React.Component {
  render() {
    return <Input {...this.props} type="checkbox" />
  }
}
