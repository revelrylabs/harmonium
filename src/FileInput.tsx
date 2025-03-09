import React, {Component, ChangeEvent} from 'react'
import classNames from 'classnames'
import InputGroup from './InputGroup'
import Button from './Button'
import InputLabel from './InputLabel'
import InputErrors from './InputErrors'
import InputHelpText from './InputHelpText'

export interface FileInputProps {
  button?: string
  error?: boolean | string
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>, ...rest: any[]) => void
  className?: string
  [key: string]: any
}

interface FileInputState {
  filePath: string | null
}

export interface FileInputStackProps {
  error?: boolean | string
  help?: string
  label?: string
  className?: string
  [key: string]: any
}

class FileInputStack extends Component<FileInputStackProps> {
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

export default class FileInput extends Component<FileInputProps, FileInputState> {
  static defaultProps = {
    button: 'Choose File',
    placeholder: 'No file chosen',
  }

  static Stack = FileInputStack

  state = {
    filePath: null,
  }

  onChange = (e: ChangeEvent<HTMLInputElement>, ...rest: any[]) => {
    const filePath = e.currentTarget.value.substring('C:\\fakepath\\'.length)

    this.setState({filePath})

    if (this.props.onChange) {
      return this.props.onChange(e, ...rest)
    }
    return null
  }

  render() {
    const {button, className, error, placeholder, ...props} = this.props
    const {filePath} = this.state

    const inputGroupClassName = classNames(className, 'rev-FileInput', {
      'is-invalid': !!error,
    })

    return (
      <InputGroup className={inputGroupClassName}>
        <InputGroup.Field>
          <InputGroup.Label className="rev-FileInput-label">
            {filePath || placeholder}
          </InputGroup.Label>
        </InputGroup.Field>
        <InputGroup.Button>
          <Button tag="label" className="rev-FileInput-button">
            {button}
            <input
              type="file"
              className="ShowForSR"
              onChange={this.onChange}
              {...props}
            />
          </Button>
        </InputGroup.Button>
      </InputGroup>
    )
  }
} 