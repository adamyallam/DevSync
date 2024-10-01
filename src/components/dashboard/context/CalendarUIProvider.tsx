'use client'
import { useState, createContext } from 'react';

type CalendarUIContextProps = {
  isWeekendShowing: boolean;
  setIsWeekendShowing: React.Dispatch<React.SetStateAction<boolean>>;
  weekOrMonth: string;
  setWeekOrMonth: React.Dispatch<React.SetStateAction<string>>;
};

export const CalendarUIContext = createContext<CalendarUIContextProps | undefined>(undefined);

interface Props {
  children: React.ReactNode
}

export const CalendarUIProvider: React.FC<Props> = ({ children }) => {
  const [isWeekendShowing, setIsWeekendShowing] = useState<boolean>(false);
  const [weekOrMonth, setWeekOrMonth] = useState<string>('Week');

  return (
      <CalendarUIContext.Provider value={{ isWeekendShowing, setIsWeekendShowing, weekOrMonth, setWeekOrMonth }}>
        {children}
      </CalendarUIContext.Provider>
  );
};

export default CalendarUIProvider