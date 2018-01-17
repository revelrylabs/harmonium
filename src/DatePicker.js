/** @jsx createElement */

import classNames from 'classnames'
import Input from './Input'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'
import React from 'react'
import Calendar from './DatePicker/Calendar'
import createElementWithOverride from './Utilities/createElementWithOverride'
import {DateTime} from 'luxon'

function goodDateInput() {
  if (typeof window === 'undefined') {
    return true
  } else {
    const el = document.createElement('input')
    el.type = 'date'
    el.value = '!)'
    return el.value == ''
  }
}

class UncontrolledDatePicker extends React.Component {
  static get defaultProps() {
    const createElement = React.createElement

    return {
      isSelectable: () => true,
    }
  }

  constructor(props) {
    super(props)
    this.goodDateInput = goodDateInput() && !this.props.dateFormat
    this.state = {
      isOpen: this.props.isOpen || false,
      focused: false,
      ...this.valuesFromProps(props),
      generation: 0,
      mousedIn: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.valuesFromProps(nextProps))
  }

  valuesFromProps(props) {
    return this.valuesFromIso(this.props.defaultValue || this.props.value)
  }

  valuesFromIso(iso) {
    return {
      isoValue: iso,
      formattedValue: this.isoToFormatted(iso),
    }
  }

  isoToFormatted(iso) {
    return DateTime.fromISO(iso).toFormat(this.dateFormat)
  }

  onChange(event) {
    const asISO = DateTime.fromFormat(event.target.value, this.dateFormat).toISODate()

    if (this.props.onChange) {
      this.props.onChange(event)
    }

    this.setState(this.valuesFromIso(asISO))
  }

  get dateFormat() {
    return this.goodDateInput ? 'yyyy-MM-dd' : (this.props.dateFormat || 'MM/dd/yyyy')
  }

  dateChanger(date) {
    this.setState(this.valuesFromIso(date))
    this.nativeInput.value = this.isoToFormatted(date)

    this.fireChangeHandler()

    this.refocus()
  }

  fireChangeHandler() {
    const event = new Event('change')
    this.nativeInput.dispatchEvent(event)
    this.onChange(event)
  }

  useNativePicker() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  }

  mouseIn() {
    this.setState({mousedIn: true})
  }

  mouseOut() {
    this.setState({mousedIn: false, isOpen: this.state.focused })
  }

  focus(event) {
    if (this.props.onFocus) {
      this.props.onFocus(event)
    }
    this.setState({focused: true, isOpen: true})
  }

  blur(event) {
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
    this.setState({focused: false, isOpen: this.state.mousedIn})
  }

  refocus() {
    if (this.nativeInput) {
      this.nativeInput.focus()
    }
    this.focus()
  }

  get calendarOpened() {
    return (this.state.isOpen || this.props.isOpen) && !this.props.disabled
  }

  render() {
    let {error, help, label, highlights, isOpen, overrides, isSelectable, calendar, week, day, headerDay, ...props} = this.props

    const createElement = createElementWithOverride.bind(this, overrides)

    const nativeClass = this.useNativePicker() ? 'rev-DatePicker--native' : 'rev-DatePicker--custom'

    return (
      <label
        className={`rev-DatePicker ${nativeClass}`}
        onMouseOver={this.mouseIn.bind(this)}
        onMouseOut={this.mouseOut.bind(this)}
      >
        {label}
        <DateInputBlock
          {...props}
          error={error}
          isoValue={this.state.isoValue}
          formattedValue={this.state.formattedValue}
          goodDateInput={this.goodDateInput}
          onFocus={this.focus.bind(this)}
          onBlur={this.blur.bind(this)}
          onChange={this.onChange.bind(this)}
          generation={this.state.generation}
          inputRef={(input) => this.nativeInput = input}
          overrides={overrides}
        />
        <InputHelpText>{help}</InputHelpText>
        <InputErrors>{error}</InputErrors>
        {
          (this.calendarOpened) ?
            <Calendar
              selectedDate={this.state.isoValue}
              dateChanger={this.dateChanger.bind(this)}
              focuser={this.refocus.bind(this)}
              overrides={overrides}
              isSelectable={isSelectable}
              week={week}
              highlights={highlights}
              {...calendar}
              day={day}
              headerDay={headerDay}
            /> : null
        }
      </label>
    )
  }
}

const DateInputBlock = ({error, className, goodDateInput, generation, overrides, dateFormat, isoValue, formattedValue, name, ...props}) => {
  const createElement = createElementWithOverride.bind(this, overrides)
  const inputClassName = classNames(className, 'rev-DatePicker-input', {
    'is-invalid-input': !!error,
    'is-invalid': !!error,
  })

  return (
    <div>
      <Input
        {...props}
        className={inputClassName}
        type={goodDateInput ? "date" : "text"}
        name={goodDateInput ? name : null}
        defaultValue={formattedValue}
      />
      {
        goodDateInput ? null :
          <Input
            type="hidden"
            name={name}
            key={`${generation}:trueInput`}
            value={isoValue || ''}
            readOnly
          />
      }
    </div>
  )
}

UncontrolledDatePicker.Calendar = Calendar
export default UncontrolledDatePicker

