import React from 'react'
import Revelry from '../../revelry'
import StatelessTabs from './StatelessTabs'

export default Revelry.registerComponent('Tabs', class Tabs extends React.Component {

  static get propTypes() {
    return {
      activeKey: React.PropTypes.string,
      onChange: React.PropTypes.func,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      activeKey: props.activeKey,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({activeKey: e.activeTab.key})
    if(this.props.onChange) {
      this.props.onChange(e)
    }
  }

  render() {
    return <StatelessTabs {...this.props}
      activeKey={this.state.activeKey}
      onChange={this.handleChange}
    />
  }

})
