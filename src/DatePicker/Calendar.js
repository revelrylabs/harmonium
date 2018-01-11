/** @jsx createElement */

import Card from '../Card'
import {DateTime, Duration} from 'luxon'
import React from 'react'
import CalendarHeaderRow from './CalendarHeaderRow'
import CalendarWeekRow from './CalendarWeekRow'
import createElementWithOverride from '../Utilities/createElementWithOverride'

export default class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: this.asLuxon(this.props.date),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date != this.props.date) {
      this.setState({date: this.asLuxon(nextProps.date)})
    }
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
    const weekday = this.startOfMonth().weekday % 7
    return this.startOfMonth().minus(Duration.fromObject({days: weekday}))
  }

  addMonth(n, e) {
    e.preventDefault()
    this.setState({date: this.startOfMonth().plus(Duration.fromObject({month: n}))})
    if (this.props.focuser) {
      this.props.focuser()
    }
  }

  render() {
    const {date, dateChanger, overrides, ...props} = this.props
    const createElement = createElementWithOverride.bind(this, this.props.overrides)

    return <Card>
      <Card.Header className="rev-Calendar-header">
        <button onClick={this.addMonth.bind(this, -1)} className="rev-Calendar-header-button">
          &lsaquo;
        </button>
        <span className="rev-Calendar-header-label">
          {this.state.date.toLocaleString({month: 'short', year: 'numeric'})}
        </span>
        <button onClick={this.addMonth.bind(this, 1)} className="rev-Calendar-header-button">
          &rsaquo;
        </button>
      </Card.Header>
      <table className="rev-Calendar-body">
        <CalendarHeaderRow firstDay={this.startOfWeekOfStartOfMonth()} overrides={overrides} />
        <tbody>
          {
            [0, 7, 14, 21, 28].map((i) => {
              return (
                <CalendarWeekRow
                  firstDay={this.startOfWeekOfStartOfMonth().plus({days:  i})}
                  dateChanger={dateChanger}
                  currentMonth={this.state.date.toFormat('yyyy-MM')}
                  selectedDate={date}
                  overrides={overrides}
                  key={i}
                />
              )
            })
          }
        </tbody>
      </table>
    </Card>
  }
}
