Rev.registerComponent('Modal', class Modal extends React.Component {

  constructor(props) {
    super(props)
    this.onBackgroundClick = this.onBackgroundClick.bind(this)
  }

  static get propTypes() {
    return {
      isOpen: React.PropTypes.bool,
      onBackgroundClick: React.PropTypes.func,
    }
  }

  static get defaultProps() {
    return {
      isOpen: false,
    }
  }

  onBackgroundClick(e) {
    if(this.props.onBackgroundClick) {
      this.props.onBackgroundClick(e)
    }
  }

  render() {
    let className = this.classAdd({
      'RevModal': true,
    })

    if(this.props.isOpen) {
      return <div className={className}>
        <div className="RevModal-background" onClick={this.onBackgroundClick} />
        <div className="RevModal-content">
          {this.props.children}
        </div>
      </div>
    }

    return null
  }

})
