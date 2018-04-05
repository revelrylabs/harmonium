/** @jsx createElement */
import {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Input from '../Input'
import createElementWithOverride from '../Utilities/createElementWithOverride'

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
class DateInputBlock extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    goodDateInput: PropTypes.bool,
    generation: PropTypes.number,
    overrides: PropTypes.object,
    dateFormat: PropTypes.string,
    isoValue: PropTypes.string,
    formattedValue: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
  }

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
          name={goodDateInput ? name : null}
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
