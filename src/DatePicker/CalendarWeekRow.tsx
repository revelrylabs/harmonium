import React, {Component} from 'react'
import {Duration, DateTime} from 'luxon'
import createElementWithOverride from '../Utilities/createElementWithOverride'
import CalendarDay, {HighlightsType} from './CalendarDay'

export interface CalendarWeekRowProps {
  currentMonth: string
  dateChanger?: (date: string) => void
  highlights?: HighlightsType
  isSelectable: (date: DateTime) => boolean
  overrides?: Record<string, React.ComponentType>
  selectedDate?: string
  day?: any
  week?: any
  firstDay: DateTime
  [key: string]: any
}

/**
 * Component representing one week of the calendar. It starts at props.firstDay
 * and loops through the seven days of the week, creating seven `CalendarDay`s.
 */
class CalendarWeekRow extends React.Component<CalendarWeekRowProps> {
  render() {
    const {
      currentMonth,
      dateChanger,
      day,
      highlights,
      isSelectable,
      overrides,
      selectedDate,
      firstDay,
      ...rowProps
    } = this.props
    const createElement = createElementWithOverride.bind(this, overrides)

    return (
      <tr {...rowProps}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const date = firstDay.plus(Duration.fromObject({days: i}))

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
}

export default CalendarWeekRow 