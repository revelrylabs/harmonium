import React, {Component} from 'react'
import CheckableFieldset from 'revelry-components/lib/CheckableFieldset'
import Checkbox from 'revelry-components/lib/Checkbox'

export class Basics extends Component {
  render() {
    return (
      <CheckableFieldset label="Poll">
        <Checkbox name="poll" defaultValue="1" label="One" />
        <Checkbox name="poll" defaultValue="2" label="Two" />
        <Checkbox name="poll" defaultValue="3" label="Three" />
      </CheckableFieldset>
    )
  }
}
