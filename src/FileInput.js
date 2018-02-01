import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InputGroup from './InputGroup'
import Button from './Button'
import InputLabel from './InputLabel'
import InputErrors from './InputErrors'
import InputHelpText from './InputHelpText'

export default class FileInput extends Component {

  static defaultProps = {
    button: 'Choose File',
    placeholder: 'No file chosen',
  };

  state = {
    filePath: null,
  };

  onChange = (e, ...rest) => {
    const filePath = e.currentTarget.value.substring('C:\\fakepath\\'.length)

    this.setState({filePath})

    if(this.props.onChange) {
      return this.props.onChange(e, ...rest)
    }
  };

  render() {
    const {button, className, error, placeholder, onChange, ...props} = this.props
    const {filePath} = this.state

    const inputGroupClassName = classNames(className, 'rev-FileInput', {
      'is-invalid': !!error,
    })

    return (
      <InputGroup className={inputGroupClassName}>
        <InputGroup.Field>
          <InputGroup.Label className="rev-FileInput-label">{filePath || placeholder}</InputGroup.Label>
        </InputGroup.Field>
        <InputGroup.Button>
          <Button tag="label" className="rev-FileInput-button">
            {button}
            <input {...props} type="file" className="ShowForSR" onChange={this.onChange} />
          </Button>
        </InputGroup.Button>
      </InputGroup>
    )
  }
}

class FileInputStack extends Component {
  render() {
    const {error, help, className, label, ...props} = this.props

    const labelClassName = classNames(className, 'rev-FileInputStack')

    return (
      <InputLabel className={labelClassName} error={error}>
        {label}
        <FileInput {...props} error={error} />
        <InputHelpText>{help}</InputHelpText>
        <InputErrors>{error}</InputErrors>
      </InputLabel>
    )
  }
}
FileInput.Stack = FileInputStack
