import React, {Component, Children, cloneElement} from 'react'
import classNames from 'classnames'

class AccordionItem extends Component {
  render() {
    const {children, className, onClick, href, title, active, ...props} = this.props

    const liClassName = classNames(className, 'accordion-item', 'rev-AccordionItem', {
      'is-active': active,
      'rev-AccordionItem--active': active,
    })

    const div = active ? (
      <div style={{display: 'block'}} className="accordion-content rev-AccordionItem-content">
        {children}
      </div>
    ) : null

    return (
      <li {...props} className={liClassName}>
        <a className="accordion-title" href={href || '#'} onClick={onClick}>{title}</a>
        {div}
      </li>
    )
  }
}

export default class Accordion extends Component {

  static defaultProps = {
    active: null,
  };

  getActivePropAsObject() {
    const {active} = this.props
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

  render() {
    const {children, ...props} = this.props

    const activeMap = this.getActivePropAsObject()

    const rewriteChild = (child) => {
      const active = activeMap[child.props.contentKey] || false
      return cloneElement(child, {active, ...child.props})
    }

    return (
      <ul className="accordion">
        {Children.map(children, rewriteChild)}
      </ul>
    )
  }
}

Accordion.Item = AccordionItem

class StatefulAccordion extends Component {

  state = {
    active: {},
  };

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
    const {contentKey, onClick, children, ...rest} = child.props
    const newOnClick = (e, ...args) => {
      e.preventDefault()
      this[multi ? 'toggleActiveStatus' : 'setExclusivelyActive'](contentKey)
      if(onClick) {
        return onClick(e, ...args)
      }
    }
    return cloneElement(child, {onClick: newOnClick, ...rest}, children)
  };

  render() {
    const {children, active, ...props} = this.props
    return (
      <Accordion active={this.state.active}>
        {Children.map(children, this.rewriteChild)}
      </Accordion>
    )
  }
}

Accordion.Stateful = StatefulAccordion
