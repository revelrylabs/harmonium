import React, { ReactNode, ElementType } from 'react'

/**
 * Type for component overrides map
 */
export interface ComponentOverrides {
  [key: string]: ElementType | undefined
}

/**
 * Creates a React element with support for component overrides
 * @param overrides - Map of component types to override
 * @param type - The component or HTML tag to create
 * @param props - The properties to pass to the component
 * @param children - Child elements
 * @returns A React element
 */
export default function createElementWithOverride(
  overrides: ComponentOverrides | null | undefined,
  type: ElementType,
  props?: Record<string, any> | null,
  ...children: ReactNode[]
): React.ReactElement {
  const typeWithOverride = (overrides || {})[type.toString()] || type

  return React.createElement(typeWithOverride, props, ...children)
} 