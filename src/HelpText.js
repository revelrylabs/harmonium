import React, {Component, PropTypes} from 'react'

export default class HelpText extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    className: PropTypes.string,
  }

  render() {
    const {children, className} = this.props

    return (
      <span className={className}>
        {children}
      </span>
    )
  }
}
