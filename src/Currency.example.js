import React, {Component} from 'react'
import Currency from './Currency'

export class Example extends Component {
  render() {
    return (
      <Currency value={100.0000001} />
    )
  }
}
