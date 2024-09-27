'use client'
import { useState, useEffect } from 'react';

function useWeekDays() {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [weekDays, setWeekDays] = useState<{ day: string; date: number }[]>([]);

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

    setWeekDays(week);
  }, []);

  return weekDays;
}

export default useWeekDays;