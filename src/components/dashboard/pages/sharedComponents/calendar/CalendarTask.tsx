import React, { useEffect, useRef, useState } from 'react';

interface CalendarTaskProps {
  parentClassName?: string;
  inputClassName?: string;
  spanClassName?: string;
  placeholder?: string;
  initialState?: string;
  maxGrowth?: number;
}


export const CalendarTask: React.FC<CalendarTaskProps> = ({ parentClassName, inputClassName, spanClassName, placeholder, initialState }) => {
  const [text, setText] = useState(`${initialState || ''}`)

  return (
    <div className={`${parentClassName ? parentClassName : 'w-full pb-2'}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`${inputClassName ? inputClassName : 'px-1 py-1 text-md w-full'}`}
      />

      <span className={`absolute top-0 left-0 invisible whitespace-pre pr-2 ${spanClassName ? spanClassName : 'text-md w-full'} `}>
        {text}
      </span>
    </div>
  );
};

export default CalendarTask;