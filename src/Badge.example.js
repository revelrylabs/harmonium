import React, {Component} from 'react'
import Badge from './Badge'

export class Styles extends Component {
  render() {
    return (
      <div>
        <Badge>1</Badge>
        <Badge secondary>2</Badge>
        <Badge warning>3</Badge>
        <Badge success>4</Badge>
        <Badge alert>5</Badge>
      </div>
    )
  }
}

export class Icons extends Component {
  render() {
    return (
      <div>
        <Badge icon="home" />
        <Badge warning icon="home">ERROR</Badge>
      </div>
    )
  }
}
