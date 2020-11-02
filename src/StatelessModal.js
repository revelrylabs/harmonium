import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CloseButton from './CloseButton'

export default class StatelessModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onBackgroundClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    isOpen: false,
  }

  onBackgroundClick = (e) => {
    if (this.props.onBackgroundClick) {
      this.props.onBackgroundClick(e)
    }
  }

  render() {
    const className = classNames(this.props.className, {
      'rev-Modal': true,
      'rev-Modal--open': this.props.isOpen,
      'rev-Modal--closed': !this.props.isOpen,
    })

    return (
      <div className={className}>
        <div
          role="button"
          className="rev-Modal-background"
          onClick={this.onBackgroundClick}
          onKeyPress={this.onBackgroundClick}
          tabIndex={0}
        />
        <div className="rev-Modal-content">{this.props.children}
          <CloseButton onClick={this.onBackgroundClick}>Close</CloseButton>
        </div>
      </div>
    )
  }
}
