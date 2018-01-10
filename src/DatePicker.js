import classNames from 'classnames'
import Card from './Card'
import Input from './Input'
import React from 'react'
import {DateTime, Duration} from 'luxon'

class CalendarHeaderRow extends React.Component {
  render() {
    return (
      <thead>
        <tr>
          {
            [0, 1, 2, 3, 4, 5, 6].map(i => {
              return (
                <th
                  className="rev-Calendar-body-headerCell"
                  key={`${this.props.firstDay.toISO()}:${i}`}
                >
                  {
                    this
                      .props
                      .firstDay
                      .plus(Duration.fromObject({days: i}))
                      .toLocaleString({weekday: 'narrow'})
                  }
                </th>
              )
            })
          }
        </tr>
      </thead>
    )
  }
}

class CalendarWeekRow extends React.Component {
  render() {

    return (
      <tr>
        {
          [0, 1, 2, 3, 4, 5, 6].map(i => {
            const date = this
                         .props
                         .firstDay
                         .plus(Duration.fromObject({days: i}))
            const monthClass = date.toFormat('yyyy-MM') == this.props.currentMonth ?
              'rev-Calendar-body-bodyCell--thisMonth' :
              'rev-Calendar-body-bodyCell--otherMonth'

            const selectionClass = this.props.selectedDate && date.toFormat('yyyy-MM-dd') == (this.props.selectedDate) ?
              'rev-Calendar-body-bodyCell--selected' :
              ''

            return (
              <td
                className={`rev-Calendar-body-bodyCell ${monthClass} ${selectionClass}`}
                key={`${this.props.firstDay.toISO()}:${i}`}
                onClick={_e => this.props.dateChanger(date.toFormat('yyyy-MM-dd'))}
              >
                {date.toLocaleString({day: 'numeric'})}
              </td>
            )
          })
        }
      </tr>
    )
  }
}

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: this.asLuxon(this.props.date),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({date: this.asLuxon(nextProps.date)})
  }

  asLuxon(date) {
    if (!date) {
      return DateTime.local()
    }

    return DateTime.fromISO(date)
  }

  startOfMonth() {
    return this.state.date.startOf('month')
  }

  endOfMonth() {
    return this.state.date.endOf('month')
  }

  startOfWeekOfStartOfMonth() {
    return this.startOfMonth().startOf('week').minus(Duration.fromObject({days: 1}))
  }

  addMonth(n, e) {
    e.preventDefault()
    this.setState({date: this.startOfMonth().plus(Duration.fromObject({month: n}))})
  }

  render() {
    return <Card>
      <Card.Header className="rev-Calendar-header">
        <button onClick={this.addMonth.bind(this, -1)} className="rev-Calendar-header-button">&lsaquo;</button>
        <span className="rev-Calendar-header-label">{this.state.date.toLocaleString({month: 'short', year: 'numeric'})}</span>
        <button onClick={this.addMonth.bind(this, 1)} className="rev-Calendar-header-button">&rsaquo;</button>
      </Card.Header>
      <table className="rev-Calendar-body">
        <CalendarHeaderRow firstDay={this.startOfWeekOfStartOfMonth()} />
        <tbody>
          <CalendarWeekRow firstDay={this.startOfWeekOfStartOfMonth()} dateChanger={this.props.dateChanger} currentMonth={this.state.date.toFormat('yyyy-MM')} selectedDate={this.props.date} />
          <CalendarWeekRow firstDay={this.startOfWeekOfStartOfMonth().plus({days:  7})} dateChanger={this.props.dateChanger} currentMonth={this.state.date.toFormat('yyyy-MM')} selectedDate={this.props.date}  />
          <CalendarWeekRow firstDay={this.startOfWeekOfStartOfMonth().plus({days: 14})} dateChanger={this.props.dateChanger} currentMonth={this.state.date.toFormat('yyyy-MM')} selectedDate={this.props.date} />
          <CalendarWeekRow firstDay={this.startOfWeekOfStartOfMonth().plus({days: 21})} dateChanger={this.props.dateChanger} currentMonth={this.state.date.toFormat('yyyy-MM')} selectedDate={this.props.date} />
          <CalendarWeekRow firstDay={this.startOfWeekOfStartOfMonth().plus({days: 28})} dateChanger={this.props.dateChanger} currentMonth={this.state.date.toFormat('yyyy-MM')} selectedDate={this.props.date}  />
        </tbody>
      </table>
    </Card>
  }
}

class UncontrolledDatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
      value: this.defaultValue(),
      generation: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.defaultValue || nextProps.value
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
    this.setState({value: date, generation: this.state.generation + 1})
  }

  useNativePicker() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  }

  render() {
    const {className, error, forceOpen, ...props} = this.props
    const inputClassName = classNames(className, 'rev-DatePicker-input', {
      'is-invalid-input': !!error,
      'is-invalid': !!error,
    })

    const nativeClass = this.useNativePicker() ? 'rev-DatePicker--native' : 'rev-DatePicker--custom'

    return React.createElement('span',
      {
        className: `rev-DatePicker ${nativeClass}`,
      },
      React.createElement(Input, {
        className: inputClassName,
        type: "date",
        defaultValue: this.state.value,
        onFocus: e => this.setState({focused: true}),
        onBlur: e => this.setState({focused: false}),
        ...props,
        onChange: this.onChange.bind(this),
        key: this.state.generation,
      }),
      this.state.focused || forceOpen ?
      React.createElement(
        Calendar,
        {
          date: this.state.value,
          dateChanger: this.dateChanger.bind(this),
        }
      ) : null
    )
  }
}

export default UncontrolledDatePicker
