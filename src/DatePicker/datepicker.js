import React, { useState, useEffect, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { DateTime, Duration } from 'luxon';
import classNames from 'classnames';
import { omit } from 'lodash';

/**
 * Helper utility for config mapping
 */
const configMapping = (config, arg, transform = (x) => x, defaultValue) => {
  if (!config) {
    return null;
  }
  
  if (Array.isArray(config)) {
    return config.includes(transform(arg)) ? defaultValue : null;
  }
  
  if (typeof config === 'function') {
    return config(arg) ? defaultValue : null;
  }
  
  return config[transform(arg)] || null;
};

/**
 * A component for a calendar input field
 */
const DateInputBlock = forwardRef(({
  error,
  className,
  goodDateInput,
  generation,
  dateFormat = 'mm/dd/yyyy',
  isoValue,
  formattedValue,
  name,
  ...props
}, ref) => {
  const inputClassName = classNames(className, 'rev-DatePicker-input', {
    'is-invalid-input': !!error,
    'is-invalid': !!error,
  });

  return (
    <div>
      <input
        {...props}
        ref={ref}
        className={inputClassName}
        type={goodDateInput ? 'date' : 'text'}
        name={goodDateInput ? name : null}
        defaultValue={formattedValue}
        placeholder={dateFormat || 'mm/dd/yyyy'}
      />
      {!goodDateInput && (
        <input
          type="hidden"
          name={name}
          key={`${generation}:trueInput`}
          value={isoValue || ''}
          readOnly
        />
      )}
    </div>
  );
});

DateInputBlock.propTypes = {
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  goodDateInput: PropTypes.bool,
  generation: PropTypes.number,
  dateFormat: PropTypes.string,
  isoValue: PropTypes.string,
  formattedValue: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
};

/**
 * A single day of the calendar.
 */
const CalendarDay = ({
  currentMonth,
  date,
  dateChanger,
  highlights,
  isSelectable,
  selectedDate,
  ...props
}) => {
  // Calculate month class
  const calculateMonthClass = (date, currentMonth) => {
    const modifier = date.toFormat('yyyy-MM') === currentMonth ? 'thisMonth' : 'otherMonth';
    return `rev-Calendar-body-bodyCell--${modifier}`;
  };

  // Calculate selection class
  const calculateSelectionClass = (isSelectable, date, selectedDate) => {
    const selectable = isSelectable(date);

    if (!selectable) {
      return 'rev-Calendar-body-bodyCell--unselectable';
    } else if (selectedDate && date.toISODate() === selectedDate) {
      return 'rev-Calendar-body-bodyCell--selected';
    }
    return '';
  };

  // Calculate highlight class
  const calculateHighlightClass = (date, highlights) => {
    return configMapping(
      highlights || {},
      date,
      (dateArg) => dateArg.toISODate(),
      'rev-Calendar-body-bodyCell--highlighted'
    ) || '';
  };

  // Handle day clicks
  const dayClickHandler = (isSelectable, date, dateChanger) => {
    const selectable = isSelectable(date);

    if (selectable) {
      return (event) => {
        event.preventDefault();
        dateChanger(date.toISODate());
      };
    }
    return null;
  };

  const monthClass = calculateMonthClass(date, currentMonth);
  const selectionClass = calculateSelectionClass(isSelectable, date, selectedDate);
  const highlightClass = calculateHighlightClass(date, highlights);
  const selectable = isSelectable(date);
  const buttonProps = omit(props, 'overrides');

  return (
    <td className={`rev-Calendar-body-bodyCell ${monthClass} ${selectionClass} ${highlightClass}`}>
      <button
        {...buttonProps}
        onClick={dayClickHandler(isSelectable, date, dateChanger)}
        aria-label={date.toLocaleString({
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        disabled={!selectable}
      >
        {date.toLocaleString({ day: 'numeric' })}
      </button>
    </td>
  );
};

CalendarDay.propTypes = {
  currentMonth: PropTypes.string,
  date: PropTypes.object,
  dateChanger: PropTypes.func,
  highlights: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.object,
  ]),
  isSelectable: PropTypes.func,
  selectedDate: PropTypes.string,
  children: PropTypes.node,
};

/**
 * Component for the calendar header row showing day labels
 */
const CalendarHeaderRow = ({ headerDay, firstDay }) => {
  return (
    <thead>
      <tr>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <th
            {...headerDay}
            className="rev-Calendar-body-headerCell"
            key={`${firstDay.toISO()}:${i}`}
          >
            {firstDay
              .plus(Duration.fromObject({ days: i }))
              .toLocaleString({ weekday: 'narrow' })}
          </th>
        ))}
      </tr>
    </thead>
  );
};

CalendarHeaderRow.propTypes = {
  headerDay: PropTypes.any,
  firstDay: PropTypes.any,
};

/**
 * Component representing one week of the calendar
 */
const CalendarWeekRow = ({
  currentMonth,
  dateChanger,
  day,
  highlights,
  isSelectable,
  selectedDate,
  firstDay,
  ...rowProps
}) => {
  return (
    <tr {...rowProps}>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const date = firstDay.plus(Duration.fromObject({ days: i }));

        return (
          <CalendarDay
            currentMonth={currentMonth}
            dateChanger={dateChanger}
            highlights={highlights}
            isSelectable={isSelectable}
            selectedDate={selectedDate}
            {...day}
            date={date}
            key={date.toISO()}
          />
        );
      })}
    </tr>
  );
};

CalendarWeekRow.propTypes = {
  currentMonth: PropTypes.string,
  dateChanger: PropTypes.func,
  highlights: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.object,
  ]),
  isSelectable: PropTypes.func,
  selectedDate: PropTypes.any,
  day: PropTypes.any,
  week: PropTypes.any,
  firstDay: PropTypes.any,
};

/**
 * A component representing a Calendar for a given focus month
 */
const Calendar = ({
  selectedDate,
  focuser,
  isSelectable = () => true,
  dateChanger = () => null,
  week,
  overlay,
  highlights,
  headerDay,
  day,
  nextLabel = <span>&rsaquo;</span>,
  previousLabel = <span>&lsaquo;</span>,
  className,
  getCalendarRef,
  showYearSelection,
  ...props
}) => {
  const calendarRef = useRef(null);
  
  // Convert an ISO date string to a Luxon DateTime
  const asLuxon = (date) => {
    if (!date) {
      return DateTime.local();
    }

    const luxon = DateTime.fromISO(date);

    if (luxon.invalid) {
      return DateTime.local();
    }
    return luxon;
  };

  const [date, setDate] = useState(asLuxon(selectedDate));

  // Update state when props change
  useEffect(() => {
    setDate(asLuxon(selectedDate));
  }, [selectedDate]);

  // Get the calendar ref
  useEffect(() => {
    if (getCalendarRef && calendarRef.current) {
      getCalendarRef(calendarRef.current);
    }
  }, [getCalendarRef]);

  // The start of the month
  const startOfMonth = () => {
    return date.startOf('month');
  };

  // Returns the nearest Sunday falling on or before the start of the month
  const startOfWeekOfStartOfMonth = () => {
    const weekday = startOfMonth().weekday % 7;
    return startOfMonth().minus(Duration.fromObject({ days: weekday }));
  };

  // Add months to the calendar
  const addMonth = (num, event) => {
    event.preventDefault();
    setDate(startOfMonth().plus(Duration.fromObject({ month: num })));
    if (focuser) {
      focuser();
    }
  };

  // Add years to the calendar
  const addYear = (num, event) => {
    event.preventDefault();
    setDate(startOfMonth().plus(Duration.fromObject({ year: num })));
    if (focuser) {
      focuser();
    }
  };

  const divProps = omit(props, 'focuser');

  return (
    <div
      {...divProps}
      ref={calendarRef}
      className={`rev-Calendar ${overlay ? 'rev-Calendar--overlay' : ''} ${className || ''}`}
    >
      <div className="rev-Card">
        <div className="rev-Calendar-header">
          <button
            onClick={(e) => addMonth(-1, e)}
            className="rev-Calendar-header-button rev-Calendar-header-button--previous"
            aria-label="Previous Month"
          >
            {previousLabel}
          </button>
          <span className="rev-Calendar-header-label">
            {date.toLocaleString({
              month: 'short',
              year: 'numeric',
            })}
          </span>
          {showYearSelection && (
            <div className="rev-Calender-year-selection">
              <button
                className="rev-Calendar-year-selection-button"
                onClick={(e) => addYear(1, e)}
              >
                <span>&#708;</span>
              </button>
              <button
                className="rev-Calendar-year-selection-button"
                onClick={(e) => addYear(-1, e)}
              >
                <span>&#709;</span>
              </button>
            </div>
          )}
          <button
            onClick={(e) => addMonth(1, e)}
            className="rev-Calendar-header-button rev-Calendar-header-button--next"
            aria-label="Next Month"
          >
            {nextLabel}
          </button>
        </div>
        <table className="rev-Calendar-body">
          <CalendarHeaderRow
            firstDay={startOfWeekOfStartOfMonth()}
            headerDay={headerDay}
          />
          <tbody>
            {[0, 7, 14, 21, 28].map((i) => (
              <CalendarWeekRow
                {...week}
                day={day}
                firstDay={startOfWeekOfStartOfMonth().plus({ days: i })}
                currentMonth={date.toFormat('yyyy-MM')}
                isSelectable={isSelectable}
                dateChanger={dateChanger}
                selectedDate={selectedDate}
                highlights={highlights}
                key={i}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  selectedDate: PropTypes.string,
  focuser: PropTypes.func,
  isSelectable: PropTypes.func,
  dateChanger: PropTypes.func,
  week: PropTypes.any,
  overlay: PropTypes.bool,
  highlights: PropTypes.any,
  headerDay: PropTypes.any,
  day: PropTypes.any,
  nextLabel: PropTypes.node,
  previousLabel: PropTypes.node,
  className: PropTypes.string,
  getCalendarRef: PropTypes.func,
  showYearSelection: PropTypes.bool,
};

/**
 * Main DatePicker component that combines Calendar and DateInputBlock
 */
const DatePicker = forwardRef(({
  selectedDate,
  name,
  dateFormat = 'MM/dd/yyyy',
  error,
  goodDateInput = true,
  className,
  onChange,
  ...props
}, ref) => {
  const [date, setDate] = useState(selectedDate || '');
  const [isOpen, setIsOpen] = useState(false);
  const [generation, setGeneration] = useState(0);
  const datePickerRef = useRef(null);
  
  // Convert an ISO date to a formatted date
  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const dateObj = DateTime.fromISO(isoDate);
    return dateObj.invalid ? '' : dateObj.toFormat(dateFormat);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setIsOpen(false);
    setGeneration(prev => prev + 1);
    
    if (onChange) {
      onChange(newDate);
    }
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="rev-DatePicker" ref={datePickerRef}>
      <DateInputBlock
        ref={ref}
        name={name}
        error={error}
        goodDateInput={goodDateInput}
        generation={generation}
        dateFormat={dateFormat}
        isoValue={date}
        formattedValue={formatDate(date)}
        className={className}
        onClick={toggleCalendar}
        {...props}
      />
      {isOpen && (
        <div className="rev-DatePicker-calendar">
          <Calendar
            selectedDate={date}
            dateChanger={handleDateChange}
            overlay={true}
          />
        </div>
      )}
    </div>
  );
});

DatePicker.propTypes = {
  selectedDate: PropTypes.string,
  name: PropTypes.string,
  dateFormat: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  goodDateInput: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export {
  Calendar,
  DateInputBlock,
  CalendarDay,
  CalendarWeekRow,
  CalendarHeaderRow,
  DatePicker
};

export default DatePicker;