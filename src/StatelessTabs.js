import React from 'react'
import classNames from 'classnames'
import StatelessTabContent from './StatelessTabContent'

export default class StatelessTabs extends React.Component {

  static get propTypes() {
    return {
      children: React.PropTypes.node,
      activeKey: React.PropTypes.string,
      onChange: React.PropTypes.func,
    }
  }

  static get defaultProps() {
    return {
      activeKey: null,
      onChange: () => null, // noop
    }
  }

  getActiveKey() {
    if(this.props.activeKey) {
      return this.props.activeKey
    }

    const {children} = this.props

    if(children && children.length && children.length > 0) {
      return children[0].key
    }

    return null
  }

  renderTab(child) {
    const isActive = child.key === this.getActiveKey()

    const className = classNames({
      'is-active': isActive,
      'tabs-title': true,
      'RevTabs-tab': true,
    })

    return <li key={child.key} className={className}>
      <a href="#" aria-selected={isActive} onClick={this.handleTabClick(child)}>{child.props.tab}</a>
    </li>
  }

  render() {
    let ulClassName = classNames({
      'RevTabs-tabs': true,
      tabs: true,
      vertical: this.props.vertical,
    })

    return (
      <div className='RevTabs'>
        <ul className={ulClassName}>
          {React.Children.map(this.props.children, this.renderTab.bind(this))}
        </ul>
        <StatelessTabContent {...this.props} activeKey={this.getActiveKey()}>
          {this.props.children}
        </StatelessTabContent>
      </div>
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
