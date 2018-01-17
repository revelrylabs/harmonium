/** @jsx createElement */

import Card from '../Card'
import {DateTime, Duration} from 'luxon'
import React from 'react'
import CalendarHeaderRow from './CalendarHeaderRow'
import CalendarWeekRow from './CalendarWeekRow'
import createElementWithOverride from '../Utilities/createElementWithOverride'

export default class Calendar extends React.Component {
  static get defaultProps() {
    const createElement = React.createElement

    return {
      nextLabel: <span>&rsaquo;</span>,
      previousLabel: <span>&lsaquo;</span>,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      date: this.asLuxon(this.props.selectedDate),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate != this.props.selectedDate) {
      this.setState({date: this.asLuxon(nextProps.selectedDate)})
    }
  }

  asLuxon(date) {
    if (!date) {
      return DateTime.local()
    }

    const luxon = DateTime.fromISO(date)
    if (luxon.invalid) {
      return DateTime.local()
    }
    return luxon
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
    const {week, overrides, day, headerDay, isSelectable, dateChanger, selectedDate, highlights, nextLabel, previousLabel, ...props} = this.props
    const createElement = createElementWithOverride.bind(this, overrides)

    return <Card {...props}>
      <Card.Header className="rev-Calendar-header">
        <button onClick={this.addMonth.bind(this, -1)} className="rev-Calendar-header-button" aria-label="Previous Month">
          {previousLabel}
        </button>
        <span className="rev-Calendar-header-label">
          {this.state.date.toLocaleString({month: 'short', year: 'numeric'})}
        </span>
        <button onClick={this.addMonth.bind(this, 1)} className="rev-Calendar-header-button" aria-label="Next Month">
          {nextLabel}
        </button>
      </Card.Header>
      <table className="rev-Calendar-body">
        <CalendarHeaderRow firstDay={this.startOfWeekOfStartOfMonth()} overrides={overrides} headerDay={headerDay} />
        <tbody>
          {
            [0, 7, 14, 21, 28].map((i) => {
              return (
                <CalendarWeekRow
                  {...week}
                  day={day}
                  firstDay={this.startOfWeekOfStartOfMonth().plus({days:  i})}
                  currentMonth={this.state.date.toFormat('yyyy-MM')}
                  isSelectable={isSelectable}
                  dateChanger={dateChanger}
                  selectedDate={selectedDate}
                  highlights={highlights}
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
