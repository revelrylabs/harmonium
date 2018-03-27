import React, {Component} from 'react'

export default class Option extends Component {
  render() {
    console.warn(
      'The `Option` component is deprecated. Use the `options` property on the `Select` component, or use the `option` tag directly.'
    )
    return <option {...this.props} />
  }
}
