import classNames from 'classnames'
import Card from './Card'
import Input from './Input'
import React from 'react'
import {DateTime, Duration} from 'luxon'

class CalendarHeaderRow extends React.Component {
  render() {
    return (
      <thead>
        {
          [0, 1, 2, 3, 4, 5, 6].map(i => {
            return (
              <th
                class="rev-Calendar-body-headerCell"
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
            return (
              <td
                className="rev-Calendar-body-bodyCell"
                key={`${this.props.firstDay.toISO()}:${i}`}
              >
                {
                  this
                    .props
                    .firstDay
                    .plus(Duration.fromObject({days: i}))
                    .toLocaleString({day: 'numeric'})
                }
              </td>
            )
          })
        }
      </tr>
    )
  }
}

class Calendar extends React.Component {
  date() {
    if (!this.props.date) {
      return DateTime.local()
    }

    return DateTime.fromISO(this.props.date)
  }

  startOfMonth() {
    return this.date().startOf('month')
  }

  endOfMonth() {
    return this.date().endOf('month')
  }

  startOfWeekOfStartOfMonth() {
    return this.startOfMonth().startOf('week').minus(Duration.fromObject({days: 1}))
  }

  render() {
    return <Card>
      <Card.Header className="rev-Calendar-header">
        {this.date().toLocaleString({month: 'long', year: 'numeric'})}
      </Card.Header>
      <table className="rev-Calendar-body">
        <CalendarHeaderRow firstDay={this.startOfWeekOfStartOfMonth()} />
        <tbody>
          <CalendarWeekRow firstDay={this.startOfWeekOfStartOfMonth()} />
          <CalendarWeekRow firstDay={this.startOfWeekOfStartOfMonth().plus({days:  7})} />
          <CalendarWeekRow firstDay={this.startOfWeekOfStartOfMonth().plus({days: 14})} />
          <CalendarWeekRow firstDay={this.startOfWeekOfStartOfMonth().plus({days: 21})} />
          <CalendarWeekRow firstDay={this.startOfWeekOfStartOfMonth().plus({days: 28})} />
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
      value: this.defaultValue()
    }
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

  render() {
    const {className, error, forceOpen, ...props} = this.props
    const inputClassName = classNames(className, 'rev-Input', {
      'is-invalid-input': !!error,
      'is-invalid': !!error,
    })

    return (
      <span>
        <Input
          className={inputClassName}
          type="date"
          defaultValue={this.state.value}
          onFocus={e => this.setState({focused: true})}
          onBlur={e => this.setState({focused: false})}
          {...props}
          onChange={this.onChange.bind(this)}
        />
        {
          this.state.focused || forceOpen ?
          <Calendar date={this.state.value} /> :
          null
        }
      </span>
    )
  }
}

export default UncontrolledDatePicker
