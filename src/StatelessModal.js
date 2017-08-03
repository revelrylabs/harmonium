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
      'rev-Modal': true,
    })

    if(this.props.isOpen) {
      return <div className={className}>
        <div className="rev-Modal-background" onClick={this.onBackgroundClick} />
        <div className="rev-Modal-content">
          {this.props.children}
        </div>
      </div>
    }

    return null
  }

}
