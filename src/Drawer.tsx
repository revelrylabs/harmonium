import React, { useState } from 'react'
import classNames from 'classnames'
import StatelessDrawer from './StatelessDrawer'
import Expander from './Expander'

const BOOL_PROPS_TO_CLASS_NAMES = {
  left: 'rev-Drawer--left',
  right: 'rev-Drawer--right',
  top: 'rev-Drawer--top',
  scroll: 'rev-Drawer--scroll',
  fixed: 'rev-Drawer--fixed',
  overlay: 'rev-Drawer--overlay',
  collapsible: 'rev-Drawer--collapsible',
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export interface DrawerProps {
  /**
   * Whether the drawer is open
   */
  open?: boolean
  /**
   * Child elements
   */
  children?: React.ReactNode
  /**
   * Additional classnames to add to the component
   */
  className?: string
  /**
   * Content of the close button
   */
  closerChildren?: React.ReactNode
  /**
   * Content of the expand button
   */
  expanderChildren?: React.ReactNode
  /**
   * Additional classnames for the expander button
   */
  expanderClassName?: string
  /**
   * Component class to use for the expander button
   */
  expanderComponentClass?: React.ElementType
  /**
   * Position the drawer on the left
   */
  left?: boolean
  /**
   * Position the drawer on the right
   */
  right?: boolean
  /**
   * Position the drawer on the top
   */
  top?: boolean
  /**
   * Allow scrolling within the drawer
   */
  scroll?: boolean
  /**
   * Fix the drawer position
   */
  fixed?: boolean
  /**
   * Show the drawer as an overlay
   */
  overlay?: boolean
  /**
   * Allow the drawer to be collapsed
   */
  collapsible?: boolean
}

/**
 * A stateful drawer component that can be opened and closed, with options for positioning
 */
const Drawer: React.FC<DrawerProps> = ({
  open = false,
  children,
  className,
  closerChildren = 'Close This',
  expanderChildren = 'Expand this',
  expanderClassName = '',
  expanderComponentClass = 'a',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(open)

  const expandDrawer = () => {
    setIsOpen(true)
  }

  const closeDrawer = () => {
    setIsOpen(false)
  }

  const propClassNames = BOOL_PROPS.reduce<Record<string, boolean>>((acc, key) => {
    const value = BOOL_PROPS_TO_CLASS_NAMES[key as keyof typeof BOOL_PROPS_TO_CLASS_NAMES]
    acc[value] = Boolean(props[key as keyof typeof props])
    return acc
  }, {})
  
  const newClassName = classNames(className, propClassNames)

  return (
    <StatelessDrawer
      open={isOpen}
      className={newClassName}
      close={closeDrawer}
      expand={expandDrawer}
      expanderComponentClass={expanderComponentClass as string}
      expanderClassName={expanderClassName}
      expanderChildren={expanderChildren}
      closerChildren={closerChildren}
    >
      {children}
    </StatelessDrawer>
  )
}

export { Drawer, Expander }
export default Drawer 