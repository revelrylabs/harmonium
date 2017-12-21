import React, {Component, Children, cloneElement} from 'react'
import classNames from 'classnames'

// Converts string or array of strings to string-to-bool object mapping
// "one" -> {one: true}
// ["one", "two"] -> {one: true, two: true}
function activeToObject(active) {
  let obj = {}
  if(active == null) {
    return obj
  }
  if(active instanceof Array) {
    active.forEach((name) => obj[name] = true)
  } else if(typeof(active) === 'object') {
    obj = active
  } else {
    obj[active] = true
  }
  return obj
}

class AccordionItem extends Component {
  render() {
    const {children, className, onClick, href, title, active, contentKey, ...props} = this.props

    const liClassName = classNames(className, 'rev-AccordionItem', {
      'is-active': active,
    })

    const aClassName = classNames('rev-AccordionItem-title', {
      'is-active': active,
    })

    const divClassName = classNames('rev-AccordionItem-content', {
      'is-active': active,
    })

    const div = (
      <div
        className={divClassName}
      >
        {children}
      </div>
    )

    return (
      <li {...props} className={liClassName}>
        <a className={aClassName} href={href || '#'} onClick={onClick}>{title}</a>
        {div}
      </li>
    )
  }
}

export default class Accordion extends Component {

  static defaultProps = {
    active: null,
  };

  render() {
    const {children, className, active, ...props} = this.props

    const activeMap = activeToObject(active)

    const rewriteChild = (child) => {
      const active = activeMap[child.props.contentKey] || false
      return cloneElement(child, {active})
    }

    const ulClassName = classNames(className, 'rev-Accordion')

    return (
      <ul {...props} className={ulClassName}>
        {Children.map(children, rewriteChild)}
      </ul>
    )
  }
}

Accordion.Item = AccordionItem

class StatefulAccordion extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: activeToObject(props.defaultActive)
    }
  }

  setExclusivelyActive = (contentKey) => {
    if(this.state.active[contentKey]) {
      return
    }
    const active = {}
    active[contentKey] = true
    this.setState({active})
  };

  toggleActiveStatus = (contentKey) => {
    const currentStatus = this.state.active[contentKey]
    const active = {...this.state.active}
    active[contentKey] = !this.state.active[contentKey]
    this.setState({active})
  };

  rewriteChild = (child) => {
    const {multi} = this.props
    const {contentKey, onClick} = child.props
    const newOnClick = (e, ...args) => {
      e.preventDefault()
      this[multi ? 'toggleActiveStatus' : 'setExclusivelyActive'](contentKey)
      if(onClick) {
        return onClick(e, ...args)
      }
    }
    return cloneElement(child, {onClick: newOnClick})
  };

  render() {
    const {children, defaultActive, multi, ...props} = this.props
    return (
      <Accordion {...props} active={this.state.active}>
        {Children.map(children, this.rewriteChild)}
      </Accordion>
    )
  }
}

Accordion.Stateful = StatefulAccordion
