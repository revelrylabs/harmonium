import React from 'react'

export interface EmptyableProps {
  /**
   * The component type to render when content is present
   */
  componentClass?: React.ElementType
  /**
   * The component to render when children are empty
   */
  emptyState: React.ReactElement
  /**
   * The content to render if present
   */
  children?: React.ReactNode
  /**
   * Any additional props to pass to the component
   */
  [key: string]: any
}

/**
 * A component that conditionally renders content or an empty state
 */
const Emptyable: React.FC<EmptyableProps> = ({
  children,
  componentClass = 'div',
  emptyState,
  ...props
}) => {
  if (children) {
    return React.createElement(componentClass, {...props}, children)
  }
  return emptyState
}

export default Emptyable 