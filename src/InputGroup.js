import React, {Component, PropTypes, Children, cloneElement} from 'react'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'

export default class InputGroup extends Component {
  render() {
    const {className, children, ...props} = this.props
    return (
      <div {...props} className={classNames(className, 'input-group', 'rev-InputGroup')}>
        {children}
      </div>
    )
  }
}

class InputGroupLabel extends Component {
  render() {
    const {className, children, ...props} = this.props
    return (
      <span {...props} className={classNames(className, 'input-group-label', 'rev-InputGroup-label')}>
        {children}
      </span>
    )
  }
}

class InputGroupButton extends Component {
  render() {
    const {className, children, ...props} = this.props
    return (
      <div {...props} className={classNames(className, 'input-group-button', 'rev-InputGroup-button')}>
        {children}
      </div>
    )
  }
}

class InputGroupField extends Component {
  render() {
    const {children, className} = this.props
    return cloneElement(
      Children.only(children),
      {className: classNames(className, 'input-group-field', 'rev-InputGroup-field')},
    )
  }
}

class InputGroupStack extends Component {

  render() {
    const {children, error, help, label, ...props} = this.props
    return (
      <InputLabel {...props} error={error}>
        {label}
        <InputGroup>
          {children}
        </InputGroup>
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
