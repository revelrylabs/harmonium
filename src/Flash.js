import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  success: ['rev-Flash--success'],
  warning: ['rev-Flash--warning'],
  alert: ['rev-Flash--alert'],
  persistent: ['rev-Flash--persistent'],
  fade: ['rev-Flash--fade'],
  dismissible: ['rev-Flash--dismissible'],
}
const BOOL_PROPS = [
  ...Object.keys(BOOL_PROPS_TO_CLASS_NAMES),
  'dismissible',
  'closeIcon',
]

export default class Flash extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    dismissible: PropTypes.bool,
    closeIcon: PropTypers.node,
  }

  state = {
    isOpen: true,
  }

  handleCloseFlash = () => {
    if (this.props.dismissible) {
      this.setState({isOpen: false})
    }
  }

  render() {
    const {className, children, dismissible, ...props} = this.props

    const boolClassNames = []

    BOOL_PROPS.forEach((name) => {
      if (props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name])
      }
      delete props[name]
    })

    const divClassName = classNames(className, 'rev-Flash', boolClassNames)

    if (this.state.isOpen) {
      return (
        <div
          {...props}
          className={divClassName}
          onClick={this.handleCloseFlash}
          onKeyPress={this.handleCloseFlash}
          role="button"
          tabIndex="0"
        >
          {children}
          {dismissible && <CloseButton icon={props.closeIcon} />}
        </div>
      )
    }

    return null
  }
}

function CloseButton({icon}) {
  return (
    <button className="rev-FlashClose">
      {icon ? icon : <span>&times;</span>}
    </button>
  )
}

CloseButton.propTypes = {
  icon: PropTypes.node,
}
