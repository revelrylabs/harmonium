import React, {Component} from 'react'
import classNames from 'classnames'
import Input from '../Input'
import createElementWithOverride from '../Utilities/createElementWithOverride'

export interface DateInputBlockProps {
  error?: boolean | string
  goodDateInput?: boolean
  generation?: number
  overrides?: Record<string, React.ComponentType>
  dateFormat?: string
  isoValue?: string
  formattedValue?: string
  name?: string
  className?: string
  [key: string]: any
}

/**
 * A component which contains the input(s) for a DatePicker. If the DatePicker
 * is a true type="date" input, and we aren't overriding the default format,
 * there will be one input here-- the input[type="date"]. If the browser has bad
 * type="date" support, or we chosen a custom date format, there will be two
 * inputs. One is a visible text input where the user types / calendar sets
 * local formatted date values (e.g. 03/12/2018). The other will be a hidden
 * input which carries the iso date value that a true date field would output.
 * Only the hidden field in this case has a name= attribute, and so it is the
 * only value submitted. This allows the server to expect the same format from
 * the client, whether date inputs are well supported on the client or not.
 * @param {object} props - the props of the DateInputBlock
 */
class DateInputBlock extends React.Component<DateInputBlockProps> {
  /* eslint complexity: [2, 6] */
  render() {
    const {
      error,
      className,
      goodDateInput,
      generation,
      overrides,
      dateFormat,
      isoValue,
      formattedValue,
      name,
      ...props
    } = this.props
    const createElement = createElementWithOverride.bind(this, overrides)
    const inputClassName = classNames(className, 'rev-DatePicker-input', {
      'is-invalid-input': !!error,
      'is-invalid': !!error,
    })

    return (
      <div>
        <Input
          {...props}
          className={inputClassName}
          type={goodDateInput ? 'date' : 'text'}
          name={goodDateInput ? name : undefined}
          defaultValue={formattedValue}
          /*         have a placeholder to avoid empty box on Firefox  */
          placeholder={dateFormat ? dateFormat : 'mm/dd/yyyy'}
        />
        {goodDateInput ? null : (
          <Input
            type="hidden"
            name={name}
            key={`${generation}:trueInput`}
            value={isoValue || ''}
            readOnly
          />
        )}
      </div>
    )
  }
}

export default DateInputBlock 