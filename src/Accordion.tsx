import React, { ReactNode, ReactElement, cloneElement } from 'react'
import classNames from 'classnames'
import { omit } from 'lodash'

// Type for active prop which can be a number, array of numbers, or object mapping
type ActivePropType = number | number[] | Record<string | number, boolean>

// Converts string or array of strings to string-to-bool object mapping
// "one" -> {one: true}
// ["one", "two"] -> {one: true, two: true}
function activeToObject(active: ActivePropType | null): Record<string | number, boolean> {
  let obj: Record<string | number, boolean> = {}

  if (active === null) {
    return obj
  }
  
  if (Array.isArray(active)) {
    active.forEach((name) => (obj[name] = true))
  } else if (typeof active === 'object') {
    obj = active as Record<string | number, boolean>
  } else {
    obj[active] = true
  }
  
  return obj
}

export interface AccordionItemProps {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  href?: string
  title: string
  active?: boolean
  renderHiddenPanes?: boolean
  contentKey: number
  className?: string
  children?: ReactNode
  mappedActive?: boolean
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  className,
  onClick,
  href,
  title,
  active,
  renderHiddenPanes,
  ...props
}) => {
  const liClassName = classNames(className, 'rev-AccordionItem', {
    'rev-AccordionItem--selected': active,
  })
  
  const aClassName = classNames('rev-AccordionItem-title', {
    'rev-AccordionItem-title--selected': active,
  })
  
  const divClassName = classNames('rev-AccordionItem-content', {
    'rev-AccordionItem-content--selected': active,
  })
  
  const liProps = omit(props, ['contentKey', 'mappedActive'])

  if (!active && !renderHiddenPanes) {
    return (
      <li {...liProps} className={liClassName}>
        <a className={aClassName} href={href || '#'} onClick={onClick}>
          {title}
        </a>
      </li>
    )
  }

  return (
    <li {...liProps} className={liClassName}>
      <a className={aClassName} href={href || '#'} onClick={onClick}>
        {title}
      </a>
      <div className={divClassName}>{children}</div>
    </li>
  )
}

export interface AccordionProps {
  active?: ActivePropType | null
  renderHiddenPanes?: boolean
  className?: string
  children?: ReactNode
}

const Accordion: React.FC<AccordionProps> & {
  Item: typeof AccordionItem
  Stateful: typeof StatefulAccordion
} = ({
  children,
  className,
  active = null,
  ...props
}) => {
  const ulClassName = classNames(className, 'rev-Accordion')
  const ulProps = omit(props, ['active', 'defaultActive', 'multi'])
  const activeMap = activeToObject(active)

  const rewriteChild = (child: ReactElement<AccordionItemProps>) => {
    const { renderHiddenPanes } = props
    const mappedActive = activeMap[child.props.contentKey] || false

    return cloneElement(child, { active: mappedActive, renderHiddenPanes })
  }

  return (
    <ul {...ulProps} className={ulClassName}>
      {React.Children.map(children as ReactElement<AccordionItemProps>[], rewriteChild)}
    </ul>
  )
}

export interface StatefulAccordionProps extends Omit<AccordionProps, 'active'> {
  defaultActive?: number
  multi?: boolean
}

interface StatefulAccordionState {
  active: Record<string | number, boolean>
}

class StatefulAccordion extends React.Component<StatefulAccordionProps, StatefulAccordionState> {
  constructor(props: StatefulAccordionProps) {
    super(props)
    this.state = {
      active: activeToObject(props.defaultActive || null),
    }
  }

  setExclusivelyActive = (contentKey: number): void => {
    if (this.state.active[contentKey]) {
      return
    }
    
    const active: Record<number, boolean> = {}
    active[contentKey] = true
    this.setState({ active })
  }

  toggleActiveStatus = (contentKey: number): void => {
    const currentStatus = this.state.active[contentKey]
    const active = { ...this.state.active }

    active[contentKey] = !currentStatus
    this.setState({ active })
  }

  rewriteChild = (child: ReactElement<AccordionItemProps>): ReactElement => {
    const { multi } = this.props
    const { contentKey, onClick } = child.props
    
    const newOnClick = (e: React.MouseEvent<HTMLAnchorElement>, ...args: any[]): void => {
      e.preventDefault()
      this[multi ? 'toggleActiveStatus' : 'setExclusivelyActive'](contentKey)
      if (onClick) {
        return onClick(e, ...args)
      }
      return
    }

    return cloneElement(child, { onClick: newOnClick })
  }

  render() {
    const { children, ...props } = this.props

    return (
      <Accordion {...props} active={this.state.active}>
        {React.Children.map(children as ReactElement<AccordionItemProps>[], this.rewriteChild)}
      </Accordion>
    )
  }
}

Accordion.Item = AccordionItem
Accordion.Stateful = StatefulAccordion

export default Accordion 