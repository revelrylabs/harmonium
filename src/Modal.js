import React, {Component} from 'react'
import PropTypes from 'prop-types'
import StatelessModal from './StatelessModal'

export default class Modal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool,
    onBackgroundClick: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: props.isOpen,
    }
  }

  handleClick = (e) => {
    this.setState({isOpen: false})
    if (this.props.onBackgroundClick) {
      this.props.onBackgroundClick(e)
    }
  }

  render() {
    const {isOpen} = this.state

    return <StatelessModal isOpen={isOpen} onBackgroundClick={this.handleClick}>
      {this.props.children}
    </StatelessModal>
  }

}
