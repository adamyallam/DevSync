import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  datePickerStyles?: string;
}

const DatePickerField: React.FC<Props> = ({ selectedDate, onDateChange, datePickerStyles }) => {
  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => onDateChange(date)}
        dateFormat="yyyy-MM-dd" // Customize format
        placeholderText="Select a date"
        className={`${datePickerStyles}`}
      />
    </>
  );
};

export default DatePickerField;