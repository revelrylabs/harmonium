import React, {Children, cloneElement, Component} from 'react'
import classNames from 'classnames'

class TabsTitle extends Component {
  render() {
    const {onClick, href, title, active} = this.props
    const className = classNames('rev-TabsTitle', {
      'rev-TabsTitle--selected': active,
    })

    return (
      <li className={className}>
        <a
          className="rev-TabsTitle-link"
          href={href || '#'}
          onClick={onClick}
          aria-selected={active}
        >
          {title}
        </a>
      </li>
    )
  }
}

class TabsPanel extends Component {
  render() {
    const {children, active, renderHiddenTabs} = this.props

    const className = classNames('rev-TabsItem-panel--selected', 'rev-TabsItem-panel')

    if (renderHiddenTabs) {
      if (!active)
        {return <div style={{display: "none"}} className={className}>
          {children}
        </div>}
        )
    } else if (!active)
        return null

    return (
      <div style={{display: 'block'}} className={className}>
        {children}
      </div>
    )
  }
}

class TabsItem extends Component {
  render() {
    const {renderTitle, ...props} = this.props

    return renderTitle ? <TabsTitle {...props} /> : <TabsPanel {...props} />
  }
}

export default class Tabs extends Component {
  render() {
    const {children, className, active, renderHiddenTabs} = this.props

    let activeKey = active
    const rewriteItem = (child) => {
      activeKey = activeKey || child.props.contentKey // default to first child
      const {contentKey} = child.props

      return cloneElement(child, {active: activeKey === contentKey, renderHiddenTabs})
    }

    const rewriteItemToTitle = (item) => {
      return cloneElement(item, {renderTitle: true})
    }

    const items = Children.map(children, rewriteItem)
    const titles = items.map(rewriteItemToTitle)

    const divClassName = classNames(className, 'rev-Tabs')

    return (
      <div className={divClassName}>
        <ul className="rev-Tabs-titles">{titles}</ul>
        <div className="rev-Tabs-content">{items}</div>
      </div>
    )
  }
}

class StatefulTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: props.defaultActive || Children.toArray(props.children)[0].props.contentKey,
    }
  }

  setActive = (contentKey) => {
    this.setState({active: contentKey})
  }

  rewriteChild = (child) => {
    const {contentKey, onClick} = child.props
    const newOnClick = (e, ...args) => {
      e.preventDefault()
      this.setActive(contentKey)
      if (onClick) {
        return onClick(e, ...args)
      }
    }

    return cloneElement(child, {onClick: newOnClick})
  }

  render() {
    const {active} = this.state
    const {children, ...props} = this.props

    return (
      <Tabs {...props} active={this.state.active}>
        {Children.map(children, this.rewriteChild)}
      </Tabs>
    )
  }
}

Tabs.Stateful = StatefulTabs
Tabs.Item = TabsItem
