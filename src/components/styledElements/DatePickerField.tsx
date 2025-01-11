import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  datePickerStyles?: string;
  dateFormat?: string
}

const DatePickerField: React.FC<Props> = ({ selectedDate, onDateChange, datePickerStyles, dateFormat = 'yyyy-MM-dd' }) => {
  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => onDateChange(date)}
        dateFormat={dateFormat}
        placeholderText="Select a date"
        className={`${datePickerStyles}`}
        wrapperClassName="datePicker"
      />
    </>
  );
};

export default DatePickerField;