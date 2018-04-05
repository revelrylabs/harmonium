import React, {Component, Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export default class InputGroup extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <div
        {...props}
        className={classNames(className, 'input-group', 'rev-InputGroup')}
      >
        {children}
      </div>
    )
  }
}

class InputGroupLabel extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <span
        {...props}
        className={classNames(className, 'rev-InputGroup-label')}
      >
        {children}
      </span>
    )
  }
}

class InputGroupButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children, ...props} = this.props

    return (
      <div
        {...props}
        className={classNames(
          className,
          'input-group-button',
          'rev-InputGroup-button'
        )}
      >
        {children}
      </div>
    )
  }
}

class InputGroupField extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {children, className} = this.props

    return cloneElement(Children.only(children), {
      className: classNames(className, 'rev-InputGroup-field'),
    })
  }
}

class InputGroupStack extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    help: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {children, error, help, label, ...props} = this.props

    return (
      <InputLabel {...props} error={error}>
        {label}
        <InputGroup>{children}</InputGroup>
        <InputHelpText>{help}</InputHelpText>
        <InputErrors>{error}</InputErrors>
      </InputLabel>
    )
  }
}

InputGroup.Label = InputGroupLabel
InputGroup.Button = InputGroupButton
InputGroup.Field = InputGroupField
InputGroup.Stack = InputGroupStack
