import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onBackgroundClick: PropTypes.func,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: props.isOpen || false,
    }
  }

  handleClick = (e) => {
    this.setState({isOpen: !this.isOpen})
    if (this.props.onBackgroundClick) {
      this.props.onBackgroundClick(e)
    }
  }

  render() {
    const {isOpen} = this.state

    return (
      <StatelessModal isOpen={isOpen} onBackgroundClick={this.handleClick}>
        {this.props.children}
      </StatelessModal>
    )
  }
}
