import React, {Component} from 'react'
import Emptyable from 'revelry-components/lib/Emptyable'

export class Empty extends Component {
  render() {
    return (
      <Emptyable componentClass="ul" emptyState={<strong>No items</strong>} />
    )
  }
}

export class NonEmpty extends Component {
  render() {
    return (
      <Emptyable componentClass="ul" emptyState={<strong>No items</strong>}>
        <li>I am not empty.</li>
      </Emptyable>
    )
  }
}
