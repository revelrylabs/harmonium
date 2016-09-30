import React, {Component} from 'react'

export default class Source extends Component {
  render() {
    return (
      <pre>
        <code>{this.props.src}</code>
      </pre>
    )
  }
}
