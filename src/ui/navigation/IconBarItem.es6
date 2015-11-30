// <IconBarItem type="FontAwesome" icon="cog" />
Rev.registerComponent('IconBarItem', class IconBarItem extends React.Component {

  static get propTypes() {
    return {
      icon: React.PropTypes.string,
      type: React.PropTypes.string,
    }
  }

  render() {
    const classes = {
      'item': true,
      'RevIconBarItem': true,
    }

    return (
      <a {...this.props} className={this.classAdd(classes)}>
        {this.renderIcon()}
        <label className="RevIconBarItem-label">{this.props.children}</label>
      </a>
    )
  }

  renderIcon() {
    const classNameObject = {
      'RevIconBarItem-icon': true,
    }

    if(this.props.icon) {
      return (
        <Rev.Components.Icon
          type={this.props.type}
          icon={this.props.icon}
          className={this.classAdd(classNameObject)}
        />
      )
    }

    if(this.props.src) {
      return (
        <img src={this.props.src} className={this.classAdd(classNameObject)} />
      )
    }

    return null
  }
})
