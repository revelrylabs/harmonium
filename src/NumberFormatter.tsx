import React from 'react'
import {omit} from 'lodash'

export interface NumberFormatterProps {
  value: number;
  locales?: string;
  [key: string]: any;
}

/**
 * NumberFormatter component for formatting numbers with localization
 * Uses the native toLocaleString method
 */
export default class NumberFormatter extends React.Component<NumberFormatterProps> {
  get optionProps(): object {
    return omit(this.props, ['locales', 'value'])
  }

  get text(): string {
    return this.props.value.toLocaleString(this.props.locales, this.optionProps)
  }

  render() {
    return <span>{this.text}</span>
  }
} 