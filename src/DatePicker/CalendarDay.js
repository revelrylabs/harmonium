import React from 'react'
import configMapping from '../Utilities/configMapping'

/**
 * A className depending on whether the date is in the focused month or not.
 * @private
 * @param {DateTime} date - the date in question as a Luxon DateTime
 * @param {string} currentMonth the current month as a string formatted yyyy-MM
 * @returns {string} the className
 */
function calculateMonthClass(date, currentMonth) {
  const modifier = date.toFormat('yyyy-MM') == currentMonth ? 'thisMonth' : 'otherMonth'

  return `rev-Calendar-body-bodyCell--${modifier}`
}

/**
 * A className depending on whether the date is selectable or not.
 * @private
 * @param {Function} isSelectable - a function which returns true id the date is
 *   selectable
 * @param {DateTime} date - a Luxon DateTime for the date in question
 * @param {string} selectedDate - an iso string of the selected date
 */
function calculateSelectionClass(isSelectable, date, selectedDate) {
  const selectable = isSelectable(date)

  if (!selectable) {
    return 'rev-Calendar-body-bodyCell--unselectable'
  } else if (selectedDate && date.toISODate() == selectedDate) {
    return 'rev-Calendar-body-bodyCell--selected'
  }
  return ''
}

/**
 * A className for a date depending on whether or not it is 'highlighted.'
 * @private
 * @param {DateTime} date - the date in question as a Luxon DateTime
 * @param {object|Array|Function} highlights a mapping between dates and
 *   highlight classes. If an array, gives a standard --highlighted modifier to
 *   a found date cell.
 */
function calculateHighlightClass(date, highlights) {
  return (
    configMapping(
      highlights || {},
      date,
      (date) => date.toISODate(),
      'rev-Calendar-body-bodyCell--highlighted'
    ) || ''
  )
}

/**
 * Handles clicks onto the cell. If the cell is selectable, invoke the
 * dateChanger that was passed in. If not, do nothing.
 * @private
 * @param {Function} isSelectable returns true if the date is selectable
 * @param {DateTime} date the date in question
 * @param {Function} dateChanger the handler to invoke if the cell is selectable
 */
function dayClickHandler(isSelectable, date, dateChanger) {
  const selectable = isSelectable(date)

  if (selectable) {
    return (_e) => dateChanger(date.toISODate())
  }
  return null
}

/**
 * A single day of the calendar. It is a button which takes up the entire table
 * cell. It handles click events, and date dependent formatting (e.g. selected
 * date format, unselectable date format, highlighted date format, etc).
 * @param {object} props the props of the day component
 */
const CalendarDay = ({
  currentMonth,
  date,
  dateChanger,
  highlights,
  isSelectable,
  overrides,
  selectedDate,
  ...props
}) => {
  const monthClass = calculateMonthClass(date, currentMonth)
  const selectionClass = calculateSelectionClass(isSelectable, date, selectedDate)
  const highlightClass = calculateHighlightClass(date, highlights)
  const selectable = isSelectable(date)

  return (
    <td className={`rev-Calendar-body-bodyCell ${monthClass} ${selectionClass} ${highlightClass}`}>
      <button
        {...props}
        onClick={dayClickHandler(isSelectable, date, dateChanger)}
        aria-label={date.toLocaleString({
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        disabled={!selectable}
      >
        {date.toLocaleString({day: 'numeric'})}
      </button>
    </td>
  )
}

export default CalendarDay
