import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import HelpText from './HelpText'

export default class InputHelpText extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    className: PropTypes.string,
  }

  render() {
    const {children, className, ...props} = this.props

    if (!children) {
      return null
    }

    const newClassName = classNames(className, 'rev-InputHelpText')

    return (
      <HelpText className={newClassName} {...props}>
        {children}
      </HelpText>
    )
  }
}
