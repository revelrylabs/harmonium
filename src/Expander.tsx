import React from 'react'

export interface ExpanderProps {
  /**
   * Whether the expander is open
   */
  open?: boolean
  /**
   * The content to render within the expander
   */
  children?: React.ReactNode
  /**
   * Additional classnames to add to the component
   */
  className?: string
  /**
   * The element to use as the closer
   */
  closer?: React.ReactNode
}

/**
 * A component that can expand and collapse content
 */
const Expander: React.FC<ExpanderProps> = ({
  open,
  children,
  className = '',
  closer
}) => {
  return (
    <div
      className={`rev-Expander ${open ? 'rev-Expander--expanded' : ''} ${className}`}
    >
      {closer}
      <div className="rev-Expander-contents">{children}</div>
    </div>
  )
}

export default Expander 