/* eslint-disable no-console */
import React, {Component} from 'react'

export interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

/**
 * @deprecated Use the `options` property on the `Select` component, or use the `option` tag directly.
 */
export default class Option extends Component<OptionProps> {
  render() {
    console.warn(
      'The `Option` component is deprecated. Use the `options` property on the `Select` component, or use the `option` tag directly.'
    )
    return <option {...this.props} />
  }
} 