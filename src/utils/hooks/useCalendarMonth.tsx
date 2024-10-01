import { useState, useEffect } from 'react';

const getDaysInMonth = (year: number, month: number) => {
  const currentDate = new Date();
  const currentYear = year ?? currentDate.getFullYear();
  const currentMonth = month ?? currentDate.getMonth(); 
  return new Date(currentYear, currentMonth + 1, 0).getDate();
};

const getStartDayOfMonth = (year: number, month: number) => {
  const currentDate = new Date();
  const currentYear = year ?? currentDate.getFullYear();
  const currentMonth = month ?? currentDate.getMonth(); 
  return new Date(currentYear, currentMonth, 1).getDay();
};

const useCalendarMonth = (inputDate?: Date) => {
  const [calendar, setCalendar] = useState<number[]>([]);

  useEffect(() => {
    const currentDate = inputDate || new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const generateCalendar = () => {
      const daysInCurrentMonth = getDaysInMonth(year, month);
      const startDay = getStartDayOfMonth(year, month);

      const daysInPrevMonth = getDaysInMonth(year, month === 0 ? 11 : month - 1);
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