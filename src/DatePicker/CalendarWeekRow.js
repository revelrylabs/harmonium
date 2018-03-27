/** @jsx createElement */
import {Duration} from 'luxon'
import {Component} from 'react'
import PropTypes from 'prop-types'
import createElementWithOverride from '../Utilities/createElementWithOverride'
import CalendarDay from './CalendarDay'

/**
 * Component representing one week of the calendar. It starts at props.firstDay
 * and loops through the seven days of the week, creating seven `CalendarDay`s.
 */
class CalendarWeekRow extends Component {
  static propTypes = {
    currentMonth: PropTypes.string,
    dateChanger: PropTypes.func,
    highlights: PropTypes.object,
    isSelectable: PropTypes.func,
    overrides: PropTypes.object,
    selectedDate: PropTypes.any,
    day: PropTypes.any,
    week: PropTypes.any,
    firstDay: PropTypes.any,
  }

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
