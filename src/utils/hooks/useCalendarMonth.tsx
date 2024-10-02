import { useState, useEffect } from 'react';

export const getDaysInMonth = (inputDate?: Date) => {
  const currentDate = inputDate || new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); 
  return new Date(currentYear, currentMonth + 1, 0).getDate();
};

export const getStartDayOfMonth = (inputDate?: Date) => {
  const currentDate = inputDate || new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); 
  return new Date(currentYear, currentMonth, 1).getDay();
};

const useCalendarMonth = (inputDate?: Date) => {
  const [calendar, setCalendar] = useState<number[]>([]);

  useEffect(() => {
    const currentDate = inputDate || new Date();

    const generateCalendar = () => {
      const daysInCurrentMonth = getDaysInMonth(currentDate);
      const startDay = getStartDayOfMonth(currentDate);

      const prevMonthInputDate = new Date(currentDate)
      prevMonthInputDate.setMonth(currentDate.getMonth() - 1)
      const daysInPrevMonth = getDaysInMonth(prevMonthInputDate);
      const prevMonthDays = [...Array(startDay)].map((_, i) => daysInPrevMonth - startDay + i + 1);

      const currentMonthDays = [...Array(daysInCurrentMonth)].map((_, i) => i + 1);

      const totalDays = prevMonthDays.length + currentMonthDays.length;

      const remainingCells = Math.max(0, 35 - totalDays);
      const nextMonthDays = [...Array(remainingCells)].map((_, i) => i + 1);

      const days = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

      setCalendar(days);
    };

    generateCalendar();
  }, [inputDate]);

  return calendar;
};

export default useCalendarMonth;