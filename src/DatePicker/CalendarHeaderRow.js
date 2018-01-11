/** @jsx createElement */
import {Duration} from 'luxon'
import React from 'react'
import createElementWithOverride from '../Utilities/createElementWithOverride'

export default class CalendarHeaderRow extends React.Component {
  render() {
    const createElement = createElementWithOverride.bind(this, this.props.overrides)

    return (
      <thead>
        <tr>
          {
            [0, 1, 2, 3, 4, 5, 6].map(i => {
              return (
                <th
                  className="rev-Calendar-body-headerCell"
                  key={`${this.props.firstDay.toISO()}:${i}`}
                >
                  {
                    this
                      .props
                      .firstDay
                      .plus(Duration.fromObject({days: i}))
                      .toLocaleString({weekday: 'narrow'})
                  }
                </th>
              )
            })
          }
        </tr>
      </thead>
    )
  }
}
