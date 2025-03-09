declare module 'harmonium/lib/DatePicker' {
  import React from 'react'
  import {DateTime} from 'luxon'
  
  export interface DatePickerProps {
    defaultValue?: string
    value?: string
    onChange?: (event: React.SyntheticEvent) => void
    onBlur?: (event: React.SyntheticEvent) => void
    onFocus?: (event: React.SyntheticEvent) => void
    error?: React.ReactNode
    help?: React.ReactNode
    label?: React.ReactNode
    disabled?: boolean
    highlights?: string[] | Record<string, string> | ((date: DateTime) => boolean | string)
    isOpen?: boolean
    overrides?: Record<string, React.ComponentType>
    isSelectable?: (date: DateTime) => boolean
    calendar?: any
    week?: any
    day?: any
    headerDay?: any
    useCalendarOnMobile?: boolean
    dateFormat?: string
    showYearSelection?: boolean
    [key: string]: any
  }

  const DatePicker: React.ComponentType<DatePickerProps>

  export default DatePicker
}

declare module 'harmonium/lib/*' {
  const component: any
  export default component
}

declare module 'harmonium' {
  export * from 'harmonium/lib/DatePicker'
  export {default as DatePicker} from 'harmonium/lib/DatePicker'
  const components: any
  export default components
} 