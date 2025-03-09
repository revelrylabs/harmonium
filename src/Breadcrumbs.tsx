import React from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  center: 'Breadcrumbs--center',
  justified: 'Breadcrumbs--justified',
  right: 'Breadcrumbs--right',
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Center-align the breadcrumbs
   */
  center?: boolean
  /**
   * Justify the breadcrumbs to fill the space
   */
  justified?: boolean
  /**
   * Right-align the breadcrumbs
   */
  right?: boolean
}

/**
 * Breadcrumbs component for navigation
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> & {
  Item: typeof BreadcrumbsItem
} = ({
  className,
  children,
  ...props
}) => {
  const propClassNames: string[] = []

  BOOL_PROPS.forEach((name) => {
    if (props[name as keyof typeof props]) {
      propClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name as keyof typeof BOOL_PROPS_TO_CLASS_NAMES])
    }
    delete props[name as keyof typeof props]
  })
  
  const newClassName = classNames(className, 'Breadcrumbs', propClassNames)

  return (
    <ul {...props} className={newClassName}>
      {children}
    </ul>
  )
}

export interface BreadcrumbsItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Whether the breadcrumb item is selected
   */
  selected?: boolean
  /**
   * Whether the breadcrumb item is disabled
   */
  disabled?: boolean
}

/**
 * Item component for Breadcrumbs
 */
const BreadcrumbsItem: React.FC<BreadcrumbsItemProps> = ({
  className,
  children,
  selected,
  disabled,
  ...props
}) => {
  const newClassName = classNames(`Breadcrumbs-item ${className || ''}`, {
    'Breadcrumbs-item--selected': selected,
    'Breadcrumbs-item--disabled': disabled,
  })
  
  return (
    <li {...props} className={newClassName}>
      {children}
    </li>
  )
}

Breadcrumbs.Item = BreadcrumbsItem

export default Breadcrumbs 