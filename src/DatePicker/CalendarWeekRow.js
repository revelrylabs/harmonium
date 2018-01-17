/** @jsx createElement */
import {Duration} from 'luxon'
import React from 'react'
import createElementWithOverride from '../Utilities/createElementWithOverride'

function configMapping(mapping, key, keyTransformer, trueValue) {
  if(mapping.call) {
    const mappedValue = mapping(key)
    return mappedValue == true ? trueValue : mappedValue
  } else if(mapping.length && typeof mapping.length === 'number') {
    return mapping.indexOf(keyTransformer(key)) > -1 ? trueValue : null
  } else {
    return mapping[keyTransformer(key)]
  }
}

function calculateMonthClass(date, currentMonth) {
  const modifier = date.toFormat('yyyy-MM') == currentMonth ? 'thisMonth' : 'otherMonth'
  return `rev-Calendar-body-bodyCell--${modifier}`
}

function calculateSelectionClass(isSelectable, date, selectedDate) {
  const selectable = isSelectable(date)
  if (!selectable) {
    return 'rev-Calendar-body-bodyCell--unselectable'
  } else if (selectedDate && date.toISODate() == selectedDate) {
    return 'rev-Calendar-body-bodyCell--selected'
  }
  return ''
}

function calculateHighlightClass(date, highlights) {
  return configMapping(
    highlights || {},
    date,
    (date) => date.toISODate(),
    'rev-Calendar-body-bodyCell--highlighted',
  ) || ''
}

function dayClickHandler(isSelectable, date, dateChanger) {
  const selectable = isSelectable(date)
  if (selectable) {
    return _e => dateChanger(date.toISODate())
  }
  return null
}

const CalendarDay = ({currentMonth, date, dateChanger, highlights, isSelectable, overrides, selectedDate, ...props}) => {
  const createElement = React.createElement
  const monthClass = calculateMonthClass(date, currentMonth)
  const selectionClass = calculateSelectionClass(isSelectable, date, selectedDate)
  const highlightClass = calculateHighlightClass(date, highlights)
  const selectable = isSelectable(date)
  return (
    <td
      className={`rev-Calendar-body-bodyCell ${monthClass} ${selectionClass} ${highlightClass}`}
    >
      <button
        {...props}
        onClick={dayClickHandler(isSelectable, date, dateChanger)}
        aria-label={date.toLocaleString({year: 'numeric', month: 'long', day: 'numeric'})}
        disabled={!selectable}
      >
        {date.toLocaleString({day: 'numeric'})}
      </button>
    </td>
  )
}

export default class CalendarWeekRow extends React.Component {
  render() {
    const {day, ...props} = this.props
    const createElement = createElementWithOverride.bind(this, this.props.overrides)

    return (
      <tr>
        {
          [0, 1, 2, 3, 4, 5, 6].map(i => {
            const date = this
                         .props
                         .firstDay
                         .plus(Duration.fromObject({days: i}))

            return <CalendarDay {...props} {...day} date={date} key={date.toISO()} />
          })
        }
      </tr>
    )
  }
}
