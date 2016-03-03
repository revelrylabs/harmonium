import React, {Component} from 'react'

export default class MethodOverride extends Component {
  render() {
    return <input name="_method" type="hidden" value={this.props.method} />
  }
}
