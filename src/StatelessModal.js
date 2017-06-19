import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from './Icon'

export default class StatelessModal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool,
    onBackgroundClick: PropTypes.func,
  }

  static defaultProps = {
    isOpen: false,
  }

  onBackgroundClick = (e) => {
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
