/** @jsx createElement */
import { Duration } from 'luxon'
import React from 'react'
import createElementWithOverride from '../Utilities/createElementWithOverride'
import CalendarDay from './CalendarDay'

/**
 * Component representing one week of the calendar. It starts at props.firstDay
 * and loops through the seven days of the week, creating seven `CalendarDay`s.
 */
const CalendarWeekRow = (props) => {
  const {
    currentMonth,
    dateChanger,
    day,
    highlights,
    isSelectable,
    overrides,
    selectedDate,
    week,
    firstDay,
    ...rowProps,
  } = props
  const createElement = createElementWithOverride.bind(this, props.overrides)

  return (
    <tr {...rowProps}>
      {[0, 1, 2, 3, 4, 5, 6].map(i => {
        const date = props.firstDay.plus(Duration.fromObject({ days: i }))

        return (
          <CalendarDay
            currentMonth={currentMonth}
            dateChanger={dateChanger}
            highlights={highlights}
            isSelectable={isSelectable}
            overrides={overrides}
            selectedDate={selectedDate}
            {...day}
            date={date}
            key={date.toISO()}
          />
        )
      })}
    </tr>
  )
}

export default CalendarWeekRow
