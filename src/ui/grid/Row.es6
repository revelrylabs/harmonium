Rev.registerComponent('Row', class Row extends React.Component {

  static get propTypes() {
    return {
      collapse: React.PropTypes.bool,
    }
  }

  static get defaultProps() {
    return {
      collapse: false,
    }
  }

  get className() {
    return this.classAdd({
      'RevRow': true,
      'row': true,
      'collapse': this.props.collapse,
    })
  }

  render() {
    return <div {...this.props} className={this.className}>
      {this.props.children}
    </div>
  }
})
