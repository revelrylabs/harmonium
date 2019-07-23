/** @jsx createElement */
import {Duration} from 'luxon'
import {Component} from 'react'
import PropTypes from 'prop-types'
import createElementWithOverride from '../Utilities/createElementWithOverride'

/**
 * A component which is the day labels at the top of the calendar e.g. S, M, T,
 * W, Th, F, S. Note that we create these letter labels in a slightly complex way
 * using Luxon, because while we don't currently support different start-of-week
 * days (we always use Sunday), we might in the future. This setup allows us to
 * do that by passing a different .firstDay prop.
 */
class CalendarHeaderRow extends Component {
  static propTypes = {
    overrides: PropTypes.object,
    headerDay: PropTypes.any,
    firstDay: PropTypes.any,
  }

  render() {
    const {headerDay, overrides, firstDay} = this.props
    const createElement = createElementWithOverride.bind(this, overrides)

    return (
      <thead>
        <tr>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            return (
              <th
                {...headerDay}
                className="rev-Calendar-body-headerCell"
                key={`${firstDay.toISO()}:${i}`}
              >
                {firstDay
                  .plus(Duration.fromObject({days: i}))
                  .toLocaleString({weekday: 'narrow'})}
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }
}

export default CalendarHeaderRow
