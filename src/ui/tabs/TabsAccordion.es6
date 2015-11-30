Rev.registerComponent('StatelessTabsAccordion', class StatelessTabsAccordion extends React.Component {

  static get defaultProps() {
    return {
      onChange: () => {}, // noop
      activeKey: null,
    }
  }

  render() {
    return (
      <ul className="RevAccordion accordion">
        {this.getNormalizedChildren().map(this.renderChild.bind(this))}
      </ul>
    )
  }

  renderChild(child) {
    const active = child.key === this.props.activeKey

    const className = this.classSet({
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
})

Rev.registerComponent('TabsAccordion', class TabsAccordion extends React.Component {

  static get defaultProps() {
    return {
      onChange: () => {}, // noop
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      activeKey: null,
    }
  }

  render() {
    return (
      <Rev.Components.StatelessTabsAccordion
        {...this.props}
        activeKey={this.state.activeKey}
        onChange={this.handleChange.bind(this)}
      />
    )
  }

  handleChange(e) {
    if(e.activeTab.key === this.state.activeKey) {
      e.activeTab = null
    }

    this.setState({
      activeKey: e.activeTab && e.activeTab.key,
    })

    return this.props.onChange(e)
  }
})
