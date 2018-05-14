/** @jsx createElement */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {DateTime, Duration} from 'luxon'
import {omit} from 'lodash'
import CalendarHeaderRow from './CalendarHeaderRow'
import CalendarWeekRow from './CalendarWeekRow'
import Card from '../Card'
import createElementWithOverride from '../Utilities/createElementWithOverride'

/**
 * A component representing a Calendar for a given focus month (& including the
 * leading days of the first week and trailing days of the last week).
 */
export default class Calendar extends Component {
  static propTypes = {
    selectedDate: PropTypes.string,
    focuser: PropTypes.func,
    isSelectable: PropTypes.func,
    dateChanger: PropTypes.func,
    overrides: PropTypes.object,
    week: PropTypes.any,
    overlay: PropTypes.bool,
    highlights: PropTypes.any,
    headerDay: PropTypes.any,
    day: PropTypes.any,
    nextLabel: PropTypes.node,
    previousLabel: PropTypes.node,
    className: PropTypes.string,
  }

  /**
   * The default values for props of this component
   * @return {object} the default value object
   */
  static get defaultProps() {
    const createElement = React.createElement

    return {
      nextLabel: <span>&rsaquo;</span>,
      previousLabel: <span>&lsaquo;</span>,
      dateChanger: () => null,
      focuser: () => null,
      isSelectable: () => true,
    }
  }

  /**
   * Creates a Calendar. Sets state.date to a Luxon DateTime based on the
   * selectedDate prop.
   * @param {*} props - the props
   */
  constructor(props) {
    super(props)
    this.state = {
      date: this.asLuxon(this.props.selectedDate),
    }
  }

  /**
   * Update state when props change. In particular, if we receive a different
   * `selectedDate` prop from up the hierarchy, set state.date to a new Luxon
   * DateTime appropriately (in order to force the calendar to focus on the new
   * date).
   * @param {*} nextProps - the next props
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate !== this.props.selectedDate) {
      this.setState({date: this.asLuxon(nextProps.selectedDate)})
    }
  }

  /**
   * Convert an iso date string to a Luxon DateTime. If iso date is blank / null,
   * or invalid (e.g. 2018-06-66), return the local current date instead.
   * @param {string} date - the date to convert, as either an iso date, or a
   *   blank / null
   * @return {DateTime} - a local DateTime
   */
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

  /**
   * The start of the month of that the current focus date is in (e.g. if the
   * input is filled with 2018-08-05 then this value is 2018-08-1).
   * @returns {DateTime} - a Luxon DateTime represented the first day of the
   *   month in question.
   */
  startOfMonth() {
    return this.state.date.startOf('month')
  }

  /**
   * Returns the nearest Sunday falling on or before the start of the month.
   * This is the first day of the first row of the calendar display. Note that
   * this date is either equal to startOfMonth (if the month starts on a Sunday)
   * or in the previous month (if the month starts on a different day of the
   * week).
   * @returns {DateTime} - a Luxon DateTime representing the Sunday when the first
   *   week of the focus month starts.
   */
  startOfWeekOfStartOfMonth() {
    const weekday = this.startOfMonth().weekday % 7

    return this.startOfMonth().minus(Duration.fromObject({days: weekday}))
  }

  /**
   * Move the focus month up n months (or back |n| months if n is negative).
   * It moves it to n months from startOfMonth to handle advancing between
   * months with different numbers of days (2018-01-31 + 1 month in Luxon =
   * 2018-03-03). We actually want Jan -> Feb -> Mar which only works if we do
   * (2018-01-31).startOfMonth() + 1month = 2018-02-01.
   *
   * This function does not change the date in the input (only calendar display,
   * so we can get away with using the first of the month like this.
   * @param {int} num - the number of months to move the focus month
   * @param {Event} event - the event that caused this handler to be invoked
   *   (e.g. the click event from the next or previous button on the calendar)
   * @return {void}
   */
  addMonth(num, event) {
    event.preventDefault()
    this.setState({
      date: this.startOfMonth().plus(Duration.fromObject({month: num})),
    })
    if (this.props.focuser) {
      this.props.focuser()
    }
  }

  render() {
    const {
      className,
      week,
      overrides,
      day,
      headerDay,
      isSelectable,
      dateChanger,
      selectedDate,
      highlights,
      nextLabel,
      previousLabel,
      overlay,
      ...props
    } = this.props
    const createElement = createElementWithOverride.bind(this, overrides)
    const divProps = omit(props, 'focuser')

    return (
      <div
        {...divProps}
        className={`rev-Calendar ${
          overlay ? 'rev-Calendar--overlay' : ''
        } ${className}`}
      >
        <Card>
          <Card.Header className="rev-Calendar-header">
            <button
              onClick={this.addMonth.bind(this, -1)}
              className="rev-Calendar-header-button rev-Calendar-header-button--previous"
              aria-label="Previous Month"
            >
              {previousLabel}
            </button>
            <span className="rev-Calendar-header-label">
              {this.state.date.toLocaleString({
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <button
              onClick={this.addMonth.bind(this, 1)}
              className="rev-Calendar-header-button rev-Calendar-header-button--next"
              aria-label="Next Month"
            >
              {nextLabel}
            </button>
          </Card.Header>
          <table className="rev-Calendar-body">
            <CalendarHeaderRow
              firstDay={this.startOfWeekOfStartOfMonth()}
              overrides={overrides}
              headerDay={headerDay}
            />
            <tbody>
              {[0, 7, 14, 21, 28].map((i) => {
                return (
                  <CalendarWeekRow
                    {...week}
                    day={day}
                    firstDay={this.startOfWeekOfStartOfMonth().plus({days: i})}
                    currentMonth={this.state.date.toFormat('yyyy-MM')}
                    isSelectable={isSelectable}
                    dateChanger={dateChanger}
                    selectedDate={selectedDate}
                    highlights={highlights}
                    key={i}
                  />
                )
              })}
            </tbody>
          </table>
        </Card>
      </div>
    )
  }
}
