/** @jsx createElement */
import {Component, createElement} from 'react'
import PropTypes from 'prop-types'
import Input from '../Input'

/**
 * A component which contains the input for a TimePicker.
 * @param {object} props - the props of the TimeInput
 */
class TimeInput extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    useGoodTimeInput: PropTypes.bool,
    showSeconds: PropTypes.bool,
    formattedValue: PropTypes.string,
    isoValue: PropTypes.string,
    generation: PropTypes.number,
    className: PropTypes.string,
  }
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
          step={showSeconds ? '1' : null}
          type="time"
          name={useGoodTimeInput ? name : null}
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
