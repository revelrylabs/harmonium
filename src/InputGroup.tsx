import React, {Component, Children, cloneElement, ReactNode, ReactElement} from 'react'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export interface InputGroupProps {
  className?: string
  children?: ReactNode
  [key: string]: any
}

export interface InputGroupLabelProps {
  className?: string
  children?: ReactNode
  [key: string]: any
}

export interface InputGroupButtonProps {
  className?: string
  children?: ReactNode
  [key: string]: any
}

export interface InputGroupFieldProps {
  className?: string
  children: ReactElement
  [key: string]: any
}

export interface InputGroupStackProps {
  error?: boolean | string
  help?: string
  label?: string
  children?: ReactNode
  [key: string]: any
}

class InputGroupLabel extends Component<InputGroupLabelProps> {
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

class InputGroupButton extends Component<InputGroupButtonProps> {
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

class InputGroupField extends Component<InputGroupFieldProps> {
  render() {
    const {children, className} = this.props

    return cloneElement(Children.only(children), {
      className: classNames(className, 'rev-InputGroup-field'),
    })
  }
}

class InputGroupStack extends Component<InputGroupStackProps> {
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

export default class InputGroup extends Component<InputGroupProps> {
  static Label = InputGroupLabel
  static Button = InputGroupButton
  static Field = InputGroupField
  static Stack = InputGroupStack

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