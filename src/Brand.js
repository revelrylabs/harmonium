import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Brand extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    className: PropTypes.string,
  }

  render() {
    const {className, children, ...props} = this.props

    const newClassName = classNames(className, 'rev-Brand')

    return (
      <a href="/" className={newClassName} {...props}>
        {children}
      </a>
    )
  }
}
