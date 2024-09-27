'use client'
import { useState, useEffect } from 'react';

function useMonthDates() {
  const [monthDates, setMonthDates] = useState<{ date: number }[]>([]);

  useEffect(() => {

  }, []);

  return monthDates;
}

export default useMonthDates;