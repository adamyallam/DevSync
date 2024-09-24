'use client'
import { useState, useEffect } from 'react';

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function useWeekDates() {
  const [weekDates, setWeekDates] = useState<{ day: string; date: number }[]>([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();

    const sunday = new Date(currentDate);
    sunday.setDate(currentDate.getDate() - currentDay);

    const week = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      return {
        day: daysOfWeek[date.getDay()],
        date: date.getDate()
      };
    });

    setWeekDates(week);
  }, []);

  return weekDates;
}

export default useWeekDates;