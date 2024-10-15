'use client'
import { useState, useEffect } from 'react';

import { getDaysInMonth, getFirstDayOfMonth } from '../dateFunctions/getDateFunctions';

// Custom hook to generate a calendar for the given month
// Returns an array of 35 objects that represent each date/day in the current month.
// Extra array items the current month doesn't fill are filled with the last or first days of the previous or next months
const useCalendar = (inputDate?: Date) => {
  const currentDate = inputDate || new Date();

  const generateCalendar = () => {
    const daysInCurrentMonth = getDaysInMonth(currentDate);
    const startDay = getFirstDayOfMonth(currentDate);

    // Generate days from the previous month to fill the start of the calendar
    const prevMonthInputDate = new Date(currentDate);
    prevMonthInputDate.setMonth(currentDate.getMonth() - 1);
    const daysInPrevMonth = getDaysInMonth(prevMonthInputDate);
    const prevMonthDays = [...Array(startDay)].map((_, i) =>
      new Date(prevMonthInputDate.getFullYear(), prevMonthInputDate.getMonth(), daysInPrevMonth - startDay + i + 1)
    );

    // Generate days for the current month
    const currentMonthDays = [...Array(daysInCurrentMonth)].map((_, i) =>
      new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
    );

    // Generate days from the next month to fill the end of the calendar
    const totalDays = prevMonthDays.length + currentMonthDays.length;
    const remainingCells = Math.max(0, 35 - totalDays);
    const nextMonthDays = [...Array(remainingCells)].map((_, i) =>
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i + 1)
    );

    // Combine all days into a single array
    const days = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

    return days.map(date => date.toISOString().split('T')[0]);
  };

  // Generate the calendar without using useEffect
  const calendar = generateCalendar();

  return calendar;
};

export default useCalendar;