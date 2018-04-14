import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class BrandLink extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
      .isRequired,
    className: PropTypes.string,
  }

  render() {
    const {className, children, screenReaderTitle, imagePath, ...props} = this.props

    const newClassName = classNames(className, 'rev-BrandLink')

    return (
      <a href="/" className={newClassName} {...props}>
        <img src={imagePath} />
        <span className="ShowForSR">{screenReaderTitle}</span>
        {children}
      </a>
    )
  }
}
