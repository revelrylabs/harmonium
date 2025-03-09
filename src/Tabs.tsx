import React, { useState, ReactNode } from 'react'
import classNames from 'classnames'

export interface TabsTitleProps extends React.HTMLAttributes<HTMLAnchorElement> {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  href?: string
  title?: string
  active?: boolean
}

/**
 * TabsTitle component for tab titles
 * @param props - Component props
 * @returns TabsTitle component
 */
const TabsTitle: React.FC<TabsTitleProps> = (props) => {
  const { onClick, href, title, active } = props
  const className = classNames('rev-TabsTitle', {
    'rev-TabsTitle--selected': active,
  })

  return (
    <li className={className}>
      <a className="rev-TabsTitle-link" href={href || '#'} onClick={onClick}>
        {title}
      </a>
    </li>
  )
}

export interface TabsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  renderHiddenTabs?: boolean
  children?: ReactNode
}

/**
 * TabsPanel component for tab content panels
 * @param props - Component props
 * @returns TabsPanel component
 */
const TabsPanel: React.FC<TabsPanelProps> = (props) => {
  const { children, active, renderHiddenTabs } = props

  const className = classNames(
    'rev-TabsItem-panel--selected',
    'rev-TabsItem-panel'
  )

  if (renderHiddenTabs) {
    if (!active) {
      return (
        <div style={{ display: 'none' }} className={className}>
          {children}
        </div>
      )
    }
  } else if (!active) {
    return null
  }

  return (
    <div style={{ display: 'block' }} className={className}>
      {children}
    </div>
  )
}

export interface TabsItemProps extends TabsTitleProps, TabsPanelProps {
  renderTitle?: boolean
  contentKey: number | string
}

/**
 * TabsItem component for individual tabs
 * @param props - Component props
 * @returns TabsItem component
 */
const TabsItem: React.FC<TabsItemProps> = (props) => {
  const { renderTitle, ...otherProps } = props

  return renderTitle ? (
    <TabsTitle {...otherProps} />
  ) : (
    <TabsPanel {...otherProps} />
  )
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: number | string
  renderHiddenTabs?: boolean
  className?: string
  children?: ReactNode
}

/**
 * Tabs component for tabbed interfaces
 * @param props - Component props
 * @returns Tabs component
 */
const Tabs: React.FC<TabsProps> & {
  Stateful: React.FC<StatefulTabsProps>
  Item: React.FC<TabsItemProps>
} = (props) => {
  const { children, className, active, renderHiddenTabs } = props

  let activeKey = active
  
  const rewriteItem = (child: React.ReactElement<TabsItemProps>) => {
    if (!React.isValidElement(child)) return null
    
    activeKey = activeKey || child.props.contentKey // default to first child
    const { contentKey } = child.props

    return React.cloneElement(child, {
      active: activeKey === contentKey,
      renderHiddenTabs,
    })
  }

  const rewriteItemToTitle = (item: React.ReactElement<TabsItemProps>) => {
    if (!React.isValidElement(item)) return null
    return React.cloneElement(item, { renderTitle: true })
  }

  const items = React.Children.map(children as React.ReactElement<TabsItemProps>[], rewriteItem)
  const titles = items?.map(rewriteItemToTitle)

  const divClassName = classNames(className, 'rev-Tabs')

  return (
    <div className={divClassName}>
      <ul className="rev-Tabs-titles">{titles}</ul>
      <div className="rev-Tabs-content">{items}</div>
    </div>
  )
}

export interface StatefulTabsProps extends Omit<TabsProps, 'active'> {
  defaultActive?: number | string
}

/**
 * StatefulTabs component for stateful tabbed interfaces
 * @param props - Component props
 * @returns StatefulTabs component
 */
const StatefulTabs: React.FC<StatefulTabsProps> = (props) => {
  const { defaultActive, children, ...otherProps } = props
  
  const firstChildKey = React.Children.toArray(children)[0] as React.ReactElement<TabsItemProps>
  const initialActive = defaultActive || (firstChildKey.props?.contentKey)
  
  const [active, setActive] = useState<number | string>(initialActive)

  const rewriteChild = (child: React.ReactElement<TabsItemProps>) => {
    if (!React.isValidElement(child)) return null
    
    const { contentKey, onClick } = child.props
    const newOnClick = (e: React.MouseEvent<HTMLAnchorElement>, ...args: any[]) => {
      e.preventDefault()
      setActive(contentKey)
      if (onClick) {
        return onClick(e, ...args)
      }
      return null
    }

    return React.cloneElement(child, { onClick: newOnClick })
  }

  return (
    <Tabs {...otherProps} active={active}>
      {React.Children.map(children as React.ReactElement<TabsItemProps>[], rewriteChild)}
    </Tabs>
  )
}

Tabs.Stateful = StatefulTabs
Tabs.Item = TabsItem

export { TabsTitle, TabsPanel, TabsItem, StatefulTabs }
export default Tabs 