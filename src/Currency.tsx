import React from 'react'
import NumberFormatter from './NumberFormatter'

/**
 * Component for formatting currency values
 */
const Currency: React.FC<React.ComponentProps<typeof NumberFormatter>> = (props) => {
  return <NumberFormatter {...props} />
}

Currency.defaultProps = {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 2,
  maxmimumFractionDigits: 2,
}

export default Currency 