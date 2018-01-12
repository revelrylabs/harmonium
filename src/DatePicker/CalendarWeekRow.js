/** @jsx createElement */
import {Duration} from 'luxon'
import React from 'react'
import createElementWithOverride from '../Utilities/createElementWithOverride'

function calculateMonthClass(date, currentMonth) {
  const modifier = date.toFormat('yyyy-MM') == currentMonth ? 'thisMonth' : 'otherMonth'
  return `rev-Calendar-body-bodyCell--${modifier}`
}

function calculateSelectionClass(isSelectable, date, selectedDate) {
  const selectable = isSelectable(date)
  if (!selectable) {
    return 'rev-Calendar-body-bodyCell--unselectable'
  } else if (selectedDate && date.toFormat('yyyy-MM-dd') == selectedDate) {
    return 'rev-Calendar-body-bodyCell--selected'
  }
  return ''
}

function dayClickHandler(isSelectable, date, dateChanger) {
  const selectable = isSelectable(date)
  if (selectable) {
    return _e => dateChanger(date.toFormat('yyyy-MM-dd'))
  }
  return null
}

const CalendarDay = ({date, currentMonth, isSelectable, overrides, selectedDate, dateChanger}) => {
  const createElement = React.createElement
  const monthClass = calculateMonthClass(date, currentMonth)
  const selectionClass = calculateSelectionClass(isSelectable, date, selectedDate)
  return (
    <td
      className={`rev-Calendar-body-bodyCell ${monthClass} ${selectionClass}`}
      onClick={dayClickHandler(isSelectable, date, dateChanger)}
    >
      {date.toLocaleString({day: 'numeric'})}
    </td>
  )
}

export default class CalendarWeekRow extends React.Component {
  render() {
    const createElement = createElementWithOverride.bind(this, this.props.overrides)

    return (
      <tr>
        {
          [0, 1, 2, 3, 4, 5, 6].map(i => {
            const date = this
                         .props
                         .firstDay
                         .plus(Duration.fromObject({days: i}))

            return <CalendarDay date={date} {...this.props} key={date.toISO()} />
          })
        }
      </tr>
    )
  }
}
