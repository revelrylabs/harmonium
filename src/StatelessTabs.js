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
    const className = classNames({
      active: child.key === this.getActiveKey(),
      'RevTabs-tab': true,
    })

    return <dd key={child.key} className={className} onClick={this.handleTabClick(child)}>
      {child.props.tab}
    </dd>
  }

  renderContent(child) {
    let newProps = {key: child.key}
    newProps.active = child.key === this.getActiveKey()
    return React.cloneElement(child, newProps)
  }

  render() {
    let dlClassName = classNames({
      'RevTabs-tabs': true,
      tabs: true,
      vertical: this.props.vertical,
    })

    return (
      <div className='RevTabs'>
        <dl className={dlClassName}>
          {React.Children.map(this.props.children, this.renderTab.bind(this))}
        </dl>
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
