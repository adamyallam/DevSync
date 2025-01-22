'use client'
import { createContext, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import useCalendar from '@/utils/hooks/useCalendar';
import CalendarTask from '../pages/sharedComponents/calendar/CalendarTask';

type CalendarUIContextProps = {
  fullCalendar: string[];
  isWeekendShowing: boolean;
  setIsWeekendShowing: React.Dispatch<React.SetStateAction<boolean>>;
  weekOrMonth: string;
  setWeekOrMonth: React.Dispatch<React.SetStateAction<string>>;
  calendarDate: Date;
  setCalendarDate: React.Dispatch<React.SetStateAction<Date>>;
};

export const CalendarUIContext = createContext<CalendarUIContextProps | undefined>(undefined);

interface Props {
  children: React.ReactNode
}

export const CalendarUIProvider: React.FC<Props> = ({ children }) => {
  const [isWeekendShowing, setIsWeekendShowing] = useState<boolean>(false);
  const [weekOrMonth, setWeekOrMonth] = useState<string>('Week');
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());

  const fullCalendar = useCalendar(calendarDate)

  return (
      <CalendarUIContext.Provider value={{ isWeekendShowing, setIsWeekendShowing, weekOrMonth, setWeekOrMonth, calendarDate, setCalendarDate, fullCalendar }}>
        {children}
      </CalendarUIContext.Provider>
  );
};

export default CalendarUIProvider