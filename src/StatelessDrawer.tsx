import React from 'react'
import classNames from 'classnames'
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

export interface StatelessDrawerProps {
  /**
   * Whether the drawer is open
   */
  open?: boolean
  /**
   * Function to close the drawer
   */
  close?: () => void
  /**
   * Function to expand the drawer
   */
  expand?: () => void
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
   * Component class to use for the expander button
   */
  expanderComponentClass?: string
  /**
   * Additional classnames for the expander button
   */
  expanderClassName?: string
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
 * A drawer component that can be opened and closed, with options for positioning
 */
const StatelessDrawer: React.FC<StatelessDrawerProps> = ({
  open = false,
  close,
  expand,
  children,
  className,
  closerChildren = 'Close This',
  expanderChildren = 'Expand this',
  expanderComponentClass = 'a',
  expanderClassName = '',
  ...props
}) => {
  const handleExpand = () => {
    if (expand) {
      expand()
    }
  }

  const handleClose = () => {
    if (close) {
      close()
    }
  }

  const propClassNames = BOOL_PROPS.reduce<Record<string, boolean>>((acc, key) => {
    const value = BOOL_PROPS_TO_CLASS_NAMES[key as keyof typeof BOOL_PROPS_TO_CLASS_NAMES]
    acc[value] = Boolean(props[key as keyof typeof props])
    return acc
  }, {})
  
  const newClassName = classNames(className, propClassNames)

  return (
    <Expander
      open={open}
      className={newClassName}
      closer={
        /* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
        <a className="rev-Drawer-closer" onClick={handleClose}>
          {closerChildren}
        </a>
        /* eslint-enable jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
      }
    >
      {React.createElement(
        expanderComponentClass,
        {
          className: `rev-Drawer-expander ${expanderClassName}`,
          onClick: handleExpand,
        },
        expanderChildren
      )}
      {children}
    </Expander>
  )
}

export {Expander}
export default StatelessDrawer 