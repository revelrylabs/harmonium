import React, {Children, cloneElement, Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {omit} from 'lodash'

// Converts string or array of strings to string-to-bool object mapping
// "one" -> {one: true}
// ["one", "two"] -> {one: true, two: true}
/* eslint complexity: [2, 4] */
function activeToObject(active) {
  let obj = {}

  if (active === null) {
    return obj
  }
  if (active instanceof Array) {
    active.forEach((name) => (obj[name] = true))
  } else if (typeof active === 'object') {
    obj = active
  } else {
    obj[active] = true
  }
  return obj
}

class AccordionItem extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    href: PropTypes.string,
    title: PropTypes.string,
    active: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array,
      PropTypes.object,
    ]),
    renderHiddenPanes: PropTypes.bool,
    contentKey: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node,
  }
  /* eslint complexity: [2, 5] */
  render() {
    const {
      children,
      className,
      onClick,
      href,
      title,
      active,
      renderHiddenPanes,
      ...props
    } = this.props
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

    const div = <div className={divClassName}>{children}</div>

    return (
      <li {...liProps} className={liClassName}>
        <a className={aClassName} href={href || '#'} onClick={onClick}>
          {title}
        </a>
        {div}
      </li>
    )
  }
}

export default class Accordion extends Component {
  static propTypes = {
    active: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array,
      PropTypes.object,
    ]),
    renderHiddenPanes: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    active: null,
  }

  rewriteChild = (child) => {
    const {active, renderHiddenPanes} = this.props
    const activeMap = activeToObject(active)
    const mappedActive = activeMap[child.props.contentKey] || false

    return cloneElement(child, {active: mappedActive, renderHiddenPanes})
  }

  render() {
    const {children, className, ...props} = this.props
    const ulClassName = classNames(className, 'rev-Accordion')
    const ulProps = omit(props, ['active', 'defaultActive', 'multi'])

    return (
      <ul {...ulProps} className={ulClassName}>
        {Children.map(children, this.rewriteChild)}
      </ul>
    )
  }
}

Accordion.Item = AccordionItem

class StatefulAccordion extends Component {
  static propTypes = {
    defaultActive: PropTypes.number,
    multi: PropTypes.bool,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props)
    this.state = {
      active: activeToObject(props.defaultActive),
    }
  }

  setExclusivelyActive = (contentKey) => {
    if (this.state.active[contentKey]) {
      return
    }
    const active = {}

    active[contentKey] = true
    this.setState({active})
  }

  toggleActiveStatus = (contentKey) => {
    const currentStatus = this.state.active[contentKey]
    const active = {...this.state.active}

    active[contentKey] = !currentStatus
    this.setState({active})
  }

  rewriteChild = (child) => {
    const {multi} = this.props
    const {contentKey, onClick} = child.props
    const newOnClick = (e, ...args) => {
      e.preventDefault()
      this[multi ? 'toggleActiveStatus' : 'setExclusivelyActive'](contentKey)
      if (onClick) {
        return onClick(e, ...args)
      }
      return null
    }

    return cloneElement(child, {onClick: newOnClick})
  }

  render() {
    const {children, ...props} = this.props

    return (
      <Accordion {...props} active={this.state.active}>
        {Children.map(children, this.rewriteChild)}
      </Accordion>
    )
  }
}

Accordion.Stateful = StatefulAccordion
