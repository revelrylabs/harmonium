import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class HelpText extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
      .isRequired,
    className: PropTypes.string,
  }

  render() {
    const {className, children, ...props} = this.props

    const newClassName = classNames(className, 'rev-HelpText')

    return (
      <small className={newClassName} {...props}>
        {children}
      </small>
    )
  }
}
