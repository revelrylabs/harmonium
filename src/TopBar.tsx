import React from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  fixed: 'rev-TopBar--fixed',
  center: 'rev-TopBar--center',
  left: 'rev-TopBar--left',
  justified: 'rev-TopBar--justified',
  right: 'rev-TopBar--right',
  breakpointMedium: 'rev-TopBar-breakpoint--mediumDown',
  breakpointLarge: 'rev-TopBar-breakpoint--largeDown',
  breakpointXlarge: 'rev-TopBar-breakpoint--xlargeDown',
  breakpointXxlarge: 'rev-TopBar-breakpoint--xxlargeDown',
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export interface TopBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  fixed?: boolean
  center?: boolean
  left?: boolean
  justified?: boolean
  right?: boolean
  breakpointMedium?: boolean
  breakpointLarge?: boolean
  breakpointXlarge?: boolean
  breakpointXxlarge?: boolean
}

/**
 * TopBar component for navigation headers
 * @param props - Component props
 * @returns TopBar component
 */
const TopBar: React.FC<TopBarProps> & {
  Item: React.FC<TopBarItemProps>
} = (props) => {
  const { className, children, ...passthrough } = props
  const propClassNames: string[] = []

  BOOL_PROPS.forEach((name) => {
    if (passthrough[name as keyof typeof passthrough]) {
      propClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name as keyof typeof BOOL_PROPS_TO_CLASS_NAMES])
    }
    delete passthrough[name as keyof typeof passthrough]
  })
  
  const newClassName = classNames(className, 'rev-TopBar', propClassNames)

  return (
    <div {...passthrough} className={newClassName}>
      <nav>{children}</nav>
    </div>
  )
}

export interface TopBarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  scroll?: boolean
  scrollSmall?: boolean
  scrollMedium?: boolean
  scrollLarge?: boolean
  scrollXlarge?: boolean
  scrollMediumDown?: boolean
  scrollLargeDown?: boolean
  scrollXlargeDown?: boolean
  scrollNav?: boolean
  scrollNavOnly?: boolean
}

/**
 * TopBarItem component for individual items in the TopBar
 * @param props - Component props
 * @returns TopBarItem component
 */
const TopBarItem: React.FC<TopBarItemProps> = (props) => {
  const {
    className,
    children,
    scroll,
    scrollSmall,
    scrollMedium,
    scrollLarge,
    scrollXlarge,
    scrollMediumDown,
    scrollLargeDown,
    scrollXlargeDown,
    scrollNav,
    scrollNavOnly,
    ...passthrough
  } = props
  
  const newClassName = classNames(`rev-TopBar-item ${className || ''}`, {
    'rev-TopBar-item--scroll': scroll,
    'rev-TopBar-item--scroll--smallOnly': scrollSmall,
    'rev-TopBar-item--scroll--medium': scrollMedium,
    'rev-TopBar-item--scroll--large': scrollLarge,
    'rev-TopBar-item--scroll--xLarge': scrollXlarge,
    'rev-TopBar-item--scroll--mediumDown': scrollMediumDown,
    'rev-TopBar-item--scroll--largeDown': scrollLargeDown,
    'rev-TopBar-item--scroll--xLargeDown': scrollXlargeDown,
    'rev-TopBar-item--scroll--nav': scrollNav,
    'rev-TopBar-item--scroll--navOnly': scrollNavOnly,
  })

  return (
    <div {...passthrough} className={newClassName}>
      {children}
    </div>
  )
}

TopBar.Item = TopBarItem

export { TopBarItem }
export default TopBar 