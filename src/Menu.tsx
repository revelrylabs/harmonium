import React from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  horizontal: ['rev-Menu--horizontalLeft'],
  horizontalLeft: ['rev-Menu--horizontalLeft'],
  horizontalCentered: ['rev-Menu--horizontalCentered'],
  horizontalJustified: ['rev-Menu--horizontalJustified'],
  horizontalRight: ['rev-Menu--horizontalRight'],

  vertical: ['rev-Menu--verticalLeft'],
  verticalLeft: ['rev-Menu--verticalLeft'],
  verticalCentered: ['rev-Menu--verticalCentered'],
  verticalRight: ['rev-Menu--verticalRight'],

  nested: ['rev-Menu--nested'],
  dividers: ['rev-Menu--dividers'],
  icons: ['rev-Menu--icons'],
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: string
  children?: React.ReactNode
  horizontal?: boolean
  horizontalLeft?: boolean
  horizontalCentered?: boolean
  horizontalJustified?: boolean
  horizontalRight?: boolean
  vertical?: boolean
  verticalLeft?: boolean
  verticalCentered?: boolean
  verticalRight?: boolean
  nested?: boolean
  dividers?: boolean
  icons?: boolean
}

/**
 * Menu component for navigation and option lists
 * @param props - Component props
 * @returns Menu component
 */
const Menu: React.FC<MenuProps> & {
  Item: React.FC<MenuItemProps>
} = (props) => {
  const { children, className, ...passthrough } = props

  const boolClassNames: string[] = []

  BOOL_PROPS.forEach((name) => {
    if (passthrough[name as keyof typeof passthrough]) {
      boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name as keyof typeof BOOL_PROPS_TO_CLASS_NAMES])
    }
    delete passthrough[name as keyof typeof passthrough]
  })
  
  const newClassName = classNames(className, 'rev-Menu', boolClassNames)

  return (
    <ul {...passthrough} className={newClassName}>
      {children}
    </ul>
  )
}

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  text?: boolean
  divider?: boolean
  active?: boolean
  className?: string
  children?: React.ReactNode
}

/**
 * MenuItem component for individual menu items
 * @param props - Component props
 * @returns MenuItem component
 */
const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { children, className = '', text, divider, active, ...passthrough } = props

  const newClassName = classNames(`rev-Menu-item ${className}`, {
    'rev-Menu-item--divider': divider,
    'rev-Menu-item--text': text,
    'rev-Menu-item--selected': active,
  })

  return (
    <li {...passthrough} className={newClassName}>
      {children}
    </li>
  )
}

Menu.Item = MenuItem

export { MenuItem }
export default Menu 