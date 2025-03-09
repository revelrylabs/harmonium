import React, { Component, ReactNode } from 'react'
import { AuthenticityTokenContext } from './AuthenticityToken'

export interface AuthenticityTokenProviderProps {
  children?: ReactNode
  name: string
  value: string
}

/**
 * Provider component that makes the authentication token available to all child components
 * using React Context API.
 */
export default class AuthenticityTokenProvider extends Component<AuthenticityTokenProviderProps> {
  render() {
    const { children, name, value } = this.props

    return (
      <AuthenticityTokenContext.Provider
        value={{
          authenticityTokenName: name,
          authenticityTokenValue: value,
        }}
      >
        {children}
      </AuthenticityTokenContext.Provider>
    )
  }
} 