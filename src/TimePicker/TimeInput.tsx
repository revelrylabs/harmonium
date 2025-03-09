import React, {Component} from 'react'
import Input from '../Input'

/**
 * A component which contains the input for a TimePicker.
 * @param {object} props - the props of the TimeInput
 */
export interface TimeInputProps {
  error?: boolean | string
  useGoodTimeInput?: boolean
  showSeconds?: boolean
  formattedValue?: string
  isoValue?: string
  generation?: number
  className?: string
  name?: string
  [key: string]: any
}

class TimeInput extends Component<TimeInputProps> {
  /* eslint complexity: [2, 5] */
  render() {
    const {
      className,
      useGoodTimeInput,
      showSeconds,
      formattedValue,
      isoValue,
      generation,
      name,
      ...props
    } = this.props

    return (
      <div>
        <Input
          {...props}
          className={className}
          step={showSeconds ? '1' : undefined}
          type="time"
          name={useGoodTimeInput ? name : undefined}
          defaultValue={formattedValue}
        />
        {useGoodTimeInput ? null : (
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

export default TimeInput 