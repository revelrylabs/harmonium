import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Brand extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    className: PropTypes.string,
    imagePath: PropTypes.string,
    altTag: PropTypes.string,
    linkPath: PropTypes.string,
  }

  render() {
    const {
      className,
      children,
      imagePath,
      altTag,
      linkPath,
      ...props
    } = this.props

    const newClassName = classNames(className, 'rev-Brand')

    return (
      <a href={linkPath} className={newClassName} {...props}>
        <img className="rev-Brand-img" src={imagePath} alt={altTag} />
        {children}
      </a>
    )
  }
}
