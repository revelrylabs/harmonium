import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class HelpText extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    className: PropTypes.string,
  }

  render() {
    const {className, children, ...props} = this.props

    const newClassName = classNames(className, 'help-text', 'rev-HelpText')

    return (
      <p className={newClassName} {...props}>
        {children}
      </p>
    )
  }
}
