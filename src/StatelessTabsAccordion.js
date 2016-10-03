import React from 'react'
import classNames from 'classnames'

export default class StatelessTabsAccordion extends React.Component {

  static get defaultProps() {
    return {
      onChange: () => {}, // noop
      activeKey: null,
    }
  }

  render() {
    return (
      <ul className="RevAccordion accordion">
        {React.Children.map(this.props.children, this.renderChild.bind(this))}
      </ul>
    )
  }

  renderChild(child) {
    const active = child.key === this.props.activeKey

    const className = classNames({
      "RevTabsAccordion": true,
      "RevTabsAccordion is-active": true,
      "accordion-navigation": true,
      "active": active,
    })

    const tab = React.cloneElement(child.props.tab, {
      onClick: this.handleTabClick(child),
    })

    const content = React.cloneElement(child, {
      active: active,
    })

    return (
      <li key={child.key} className={className}>
        {tab}
        {content}
      </li>
    )
  }

  handleTabClick(activeTab) {
    return (e) => {
      e.preventDefault()
      e.stopPropagation()
      e.activeTab = activeTab
      this.props.onChange(e)
    }
  }
}
