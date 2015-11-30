Rev.registerComponent('TabBlock', class TabBlock extends React.Component {

  static get propTypes() {
    return {
      active: React.PropTypes.bool,
    }
  }

  static get defaultProps() {
    return {
      active: false,
    }
  }

  get className() {
    return this.classAdd({
      'RevTabBlock': true,
      'RevTabBlock--active': this.props.active,
      'content': true,
      'active': this.props.active,
    })
  }

  render() {
    return <div {...this.props}
      className={this.className}
      key={this.props.key}
    />
  }
})
