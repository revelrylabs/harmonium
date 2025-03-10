import React from 'react'

export interface PluralizeProps {
  count: number;
  one: string;
  more?: string;
}

/**
 * Pluralize component for handling singular/plural text based on a count
 */
export default class Pluralize extends React.Component<PluralizeProps> {
  get text(): string {
    if (this.props.count === 1) {
      return `${this.props.count} ${this.props.one}`
    }
    return `${this.props.count} ${this.props.more || `${this.props.one}s`}`
  }

  render() {
    return <span>{this.text}</span>
  }
} 