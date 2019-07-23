import React from 'react'

export default function createElementWithOverride(
  overrides,
  type,
  props,
  ...children
) {
  const typeWithOverride = (overrides || {})[type] || type

  return React.createElement(typeWithOverride, props, ...children)
}
