import React, {useState} from 'react'
import {DatePicker} from 'harmonium'
import {DateTime} from 'luxon'

const DatePickerDemo = () => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>('2023-03-15')

  const handleDateChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    setSelectedDate(target.value)
  }

  // Function to determine if a date is selectable (weekends not selectable)
  const isWeekdaySelectable = (date: DateTime) => {
    const weekday = date.weekday
    return weekday !== 6 && weekday !== 7 // 6 = Saturday, 7 = Sunday
  }

  // Highlight specific dates
  const highlights = ['2023-03-01', '2023-03-10', '2023-03-20']

  return (
    <div>
      <h3>Default DatePicker</h3>
      <DatePicker />

      <h3>DatePicker with value</h3>
      <DatePicker value={selectedDate} onChange={handleDateChange} />

      <h3>DatePicker with custom date format</h3>
      <DatePicker dateFormat="MM/dd/yyyy" />

      <h3>DatePicker with weekend dates disabled</h3>
      <DatePicker isSelectable={isWeekdaySelectable} />

      <h3>DatePicker with highlighted dates</h3>
      <DatePicker highlights={highlights} />

      <h3>DatePicker with calendar always open</h3>
      <DatePicker isOpen={true} />

      <h3>DatePicker with error</h3>
      <DatePicker error="Please select a valid date" />

      <h3>DatePicker with help text</h3>
      <DatePicker help="Select a date in MM/DD/YYYY format" />

      <h3>DatePicker with label</h3>
      <DatePicker label="Event Date" />

      <h3>DatePicker with year selection buttons</h3>
      <DatePicker showYearSelection />

      <h3>Disabled DatePicker</h3>
      <DatePicker disabled />
    </div>
  )
}

export default DatePickerDemo 