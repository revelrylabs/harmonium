import React, {Component} from 'react'
import Badge from './Badge'

export class Styles extends Component {
  render() {
    return (
      <div>
        <Badge primary small id="messageCount">
          1
        </Badge>
        <Badge secondary medium>
          2
        </Badge>
        <Badge warning large>
          3
        </Badge>
        <Badge success>
          4
        </Badge>
        <Badge alert>
          5
        </Badge>
        <Badge>
          6
        </Badge>
      </div>


    )
  }
}
