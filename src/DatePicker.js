/** @jsx createElement */

import classNames from 'classnames'
import Input from './Input'
import React from 'react'
import Calendar from './DatePicker/Calendar'
import createElementWithOverride from './Utilities/createElementWithOverride'

class UncontrolledDatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: this.props.forceOpen || false,
      focused: false,
      value: this.defaultValue(),
      generation: 0,
      mousedIn: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.defaultValue || nextProps.value,
    })
  }

  defaultValue() {
    return this.props.defaultValue || this.props.value
  }

  onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event)
    }
    this.setState({value: event.target.value})
  }

  dateChanger(date) {
    this.setState({value: date})
    this.nativeInput.value = date

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
    this.setState({mousedIn: false, opened: this.state.focused })
  }

  focus() {
    this.setState({focused: true, opened: true})
  }

  blur() {
    this.setState({focused: false, opened: this.state.mousedIn})
  }

  refocus() {
    if (this.nativeInput) {
      this.nativeInput.focus()
    }
    this.focus()
  }

  render() {
    let {className, error, forceOpen, overrides, calendarDayClassName, dayClassName, weekClassName, weekHeaderClassName, isSelectable, calendarHighlights, ...props} = this.props
    isSelectable = isSelectable || (() => true)
    const calendarProps = {calendarDayClassName, dayClassName, weekClassName, weekHeaderClassName, isSelectable, calendarHighlights}
    const inputClassName = classNames(className, 'rev-DatePicker-input', {
      'is-invalid-input': !!error,
      'is-invalid': !!error,
    })

    const createElement = createElementWithOverride.bind(this, overrides)

    const nativeClass = this.useNativePicker() ? 'rev-DatePicker--native' : 'rev-DatePicker--custom'

    return (
      <label
        className={`rev-DatePicker ${nativeClass}`}
        onMouseOver={this.mouseIn.bind(this)}
        onMouseOut={this.mouseOut.bind(this)}
      >
        <Input
          className={inputClassName}
          type="date"
          defaultValue={this.state.value}
          onFocus={this.focus.bind(this)}
          onBlur={this.blur.bind(this)}
          {...props}
          onChange={this.onChange.bind(this)}
          key={this.state.generation}
          inputRef={(input) => this.nativeInput = input}
        />
        {
          this.state.opened || forceOpen ?
            <Calendar
              date={this.state.value}
              dateChanger={this.dateChanger.bind(this)}
              focuser={this.refocus.bind(this)}
              overrides={overrides}
              {...calendarProps}
            /> : null
        }
      </label>
    )
  }
}

UncontrolledDatePicker.Calendar = Calendar
export default UncontrolledDatePicker
