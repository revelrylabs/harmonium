/** @jsx createElement */
import {Duration} from 'luxon'
import React from 'react'
import createElementWithOverride from '../Utilities/createElementWithOverride'

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
