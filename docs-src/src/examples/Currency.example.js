import React, {Component} from 'react'
import Currency from 'revelry-components/lib/Currency'

export class Example extends Component {
  render() {
    return (
      <Currency value={100.0000001} />
    )
  }
}
