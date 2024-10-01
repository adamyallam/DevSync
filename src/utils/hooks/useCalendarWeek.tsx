'use client'
import { useState, useEffect } from 'react';

function useCalendarWeek(startDate?: Date) {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [weekDays, setWeekDays] = useState<{ day: string; date: number }[]>([]);

  useEffect(() => {
    const currentDate = startDate || new Date();
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

    setWeekDays(week);
  }, [startDate]);

  return weekDays;
}

export default useCalendarWeek;