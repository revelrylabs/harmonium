import React from 'react'

// Declare the global I18n interface for the i18n-js library
declare global {
  interface Window {
    I18n: {
      t: (key: string, options?: object) => string;
    }
  }
}

export interface I18nProps {
  t: string;
  [key: string]: any;
}

/**
 * I18n component for internationalization using i18n-js
 * Provides a wrapper around I18n.t for use in React components
 */
export default class I18n extends React.Component<I18nProps> {
  get text(): string {
    if (typeof window.I18n === 'undefined') {
      throw new Error('Missing i18n-js dependency.')
    }
    return window.I18n.t(this.props.t, this.props)
  }

  render() {
    return <span>{this.text}</span>
  }
} 