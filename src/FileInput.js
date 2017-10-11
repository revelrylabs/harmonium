import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InputGroup from './InputGroup'
import Button from './Button'
import InputLabel from './InputLabel'
import InputErrors from './InputErrors'
import InputHelpText from './InputHelpText'
import {Col, Row} from './grid'

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
        <Row>
          <Col medium={6} className="rev-Col--collapse">
            <InputGroup.Button>
              <Button tag="label" className="rev-FileInput-button" expanded small>
                {button}
                <input {...props} type="file" className="u-showForSR" onChange={this.onChange} />
              </Button>
            </InputGroup.Button>
          </Col>
          <Col medium={6} className="rev-Col--collapse rev-Col--mediumUncollapse">
            <div className="rev-FileInput-fileLabel">
              <InputGroup.Field>
                <InputGroup.Label className="rev-FileInput-label">{filePath || placeholder}</InputGroup.Label>
              </InputGroup.Field>
            </div>
          </Col>
        </Row>
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
