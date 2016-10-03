import React from 'react'

import StatelessTabsAccordion from './StatelessTabsAccordion'

export default class TabsAccordion extends React.Component {

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
      <Revelry.Components.StatelessTabsAccordion
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
}
