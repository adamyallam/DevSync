'use client'
import { useState, useEffect } from 'react';

// Returns the number of days in a month
export const getDaysInMonth = (inputDate?: Date) => {
  const currentDate = inputDate || new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  return new Date(currentYear, currentMonth + 1, 0).getDate();
};

// Returns the first day of the month
export const getFirstDayOfMonth = (inputDate?: Date) => {
  const currentDate = inputDate || new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  return new Date(currentYear, currentMonth, 1).getDay();
};

// Returns an array of 35 objects that represent each date/day in the current month. Extra array items the current month doesn't fill are filled with the last or first days of the previous or next months
const useCalendar = (inputDate?: Date) => {
  const [calendar, setCalendar] = useState<{ date: Date; day: string }[]>([]);

  useEffect(() => {
    const currentDate = inputDate || new Date();

    const generateCalendar = () => {
      const daysInCurrentMonth = getDaysInMonth(currentDate);
      const startDay = getFirstDayOfMonth(currentDate);

      const prevMonthInputDate = new Date(currentDate);
      prevMonthInputDate.setMonth(currentDate.getMonth() - 1);
      const daysInPrevMonth = getDaysInMonth(prevMonthInputDate);
      const prevMonthDays = [...Array(startDay)].map((_, i) => 
        new Date(prevMonthInputDate.getFullYear(), prevMonthInputDate.getMonth(), daysInPrevMonth - startDay + i + 1)
      );

      const currentMonthDays = [...Array(daysInCurrentMonth)].map((_, i) => 
        new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
      );

      const totalDays = prevMonthDays.length + currentMonthDays.length;
      const remainingCells = Math.max(0, 35 - totalDays);
      const nextMonthDays = [...Array(remainingCells)].map((_, i) => 
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i + 1)
      );

      const days = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

      const formattedDays = days.map(date => {
        const day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
        return { date, day };
      });

      setCalendar(formattedDays);
    };

    generateCalendar();
  }, [inputDate]);

  return calendar;
};

export default useCalendar;