import React from 'react'
import Input from './Input'

export default class Radio extends React.Component {
  render() {
    return <Input {...this.props} type="radio" />
  }
}
