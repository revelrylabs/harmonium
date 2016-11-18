import React, {Component} from 'react'
import classNames from 'classnames'
import Icon from './Icon'

export default class StatelessModal extends Component {

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
    let className = classNames(this.props.className, {
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

}
