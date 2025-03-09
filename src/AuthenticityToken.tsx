import React, { useContext } from 'react'

// Define the context type
interface AuthenticityTokenContext {
  authenticityTokenValue?: string
  authenticityTokenName?: string
}

// Create a React context for the authenticity token
export const AuthenticityTokenContext = React.createContext<AuthenticityTokenContext>({
  authenticityTokenValue: undefined,
  authenticityTokenName: undefined,
})

export interface AuthenticityTokenProps {}

/**
 * AuthenticityToken component for CSRF protection in forms
 * @returns Hidden input with authenticity token or null if no token name is provided
 */
const AuthenticityToken: React.FC<AuthenticityTokenProps> = () => {
  const { authenticityTokenName, authenticityTokenValue } = useContext(AuthenticityTokenContext)

  // If a name has not been provided, just don't render.
  if (!authenticityTokenName) {
    return null
  }

  return (
    <input
      type="hidden"
      name={authenticityTokenName}
      value={authenticityTokenValue}
    />
  )
}

export default AuthenticityToken 