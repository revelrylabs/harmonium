import React, { useState, ChangeEvent } from 'react'

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  min?: number
  max?: number
  step?: number
  initialValue?: number
  name?: string
  onChange?: (value: number) => void
}

/**
 * Slider component for range input with text input control
 * @param props - Component props
 * @returns Slider component
 */
const Slider: React.FC<SliderProps> = (props) => {
  const {
    min = 0,
    max = 100,
    step = 1,
    initialValue = min,
    name,
    onChange,
    ...rangeInputProps
  } = props

  const [value, setValue] = useState<number>(initialValue)

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    setValue(newValue)
    
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value)

    let newValue: number
    if (inputValue > max) {
      newValue = max
    } else if (inputValue < min) {
      newValue = min
    } else if (isNaN(inputValue)) {
      newValue = min
    } else {
      newValue = inputValue
    }

    setValue(newValue)
    
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <div className="rev-Slider">
      <div className="rev-Slider-range-container">
        <input
          className="rev-Slider-range"
          {...rangeInputProps}
          type="range"
          min={min}
          max={max}
          step={step}
          onChange={handleSliderChange}
          value={value}
        />
      </div>
      <input
        type="text"
        className="rev-Slider-input"
        onChange={handleInputChange}
        name={name}
        value={value}
      />
    </div>
  )
}

export default Slider 