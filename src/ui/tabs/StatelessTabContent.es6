Rev.registerComponent('StatelessTabContent', class StatelessTabContent extends React.Component {

  static get propTypes() {
    return {
      activeKey: React.PropTypes.string.isRequired,
    }
  }

  constructor(props) {
    super(props)
    this.renderChild = this.renderChild.bind(this)
  }

  get className() {
    return this.classAdd({
      'RevTabs-content': true,
      'tabs-content': true,
    })
  }

  renderChild(child) {
    let newProps = {
      key: child.key,
      active: child.key === this.props.activeKey,
    }
    return React.cloneElement(child, newProps)
  }

  render() {
    return <div className={this.className}>
      {this.mapChildren(this.renderChild)}
    </div>
  }

})
