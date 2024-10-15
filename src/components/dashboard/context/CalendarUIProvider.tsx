'use client'
import { createContext, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import useCalendar from '@/utils/hooks/useCalendar';
import AutoResizingInput from '@/components/styledElements/AutoResizingInput';
import CalendarTask from '../pages/sharedTasks/calendar/CalendarTask';

type CalendarUIContextProps = {
  fullCalendar: string[];
  calendarTasks: { [dateString: string]: JSX.Element[] };
  isWeekendShowing: boolean;
  setIsWeekendShowing: React.Dispatch<React.SetStateAction<boolean>>;
  weekOrMonth: string;
  setWeekOrMonth: React.Dispatch<React.SetStateAction<string>>;
  calendarDate: Date;
  setCalendarDate: React.Dispatch<React.SetStateAction<Date>>;
  getTaskCount: (date: string) => JSX.Element;
  addTask: (date: string) => void;
  addTaskButton: (date: string) => JSX.Element;
};

export const CalendarUIContext = createContext<CalendarUIContextProps | undefined>(undefined);

interface Props {
  children: React.ReactNode
}

export const CalendarUIProvider: React.FC<Props> = ({ children }) => {
  const [isWeekendShowing, setIsWeekendShowing] = useState<boolean>(false);
  const [weekOrMonth, setWeekOrMonth] = useState<string>('Week');
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [calendarTasks, setCalendarTasks] = useState<{ [dateString: string]: JSX.Element[] }>({});

  const fullCalendar = useCalendar(calendarDate)

  //Function to display the addTaskButton
  const addTaskButton = (date: string) => {
    return (
      <button onClick={() => {addTask(date)}} className={`flex items-center pb-2 font-semibold opacity-80 hover:opacity-100 ${weekOrMonth === 'Month' ? 'text-xs' : ''}`}>
        <Plus size={weekOrMonth === 'Week' ? 17 : 12} strokeWidth={2.5}/>
        Add Task
      </button>
    )
  }

  // Function to add a task to the calendarTasks object
  const addTask = (date: string) => {
  
    const calendarTask = (
      <CalendarTask key={calendarTasks[date]?.length || 0} parentClassName='w-[85%] pb-1.5' inputClassName='px-1 py-1 text-md w-full border border-gray-300 rounded-md drop-shadow-sm'/>
    );
  
    setCalendarTasks((prevTasks) => ({
      ...prevTasks,
      [date]: [...(prevTasks[date] || []), calendarTask],
    }));
  };

  // Gets a task count for number of tasks within a date
  const getTaskCount = (date: string) => {
    const taskCount = calendarTasks[date]?.length || 0;
  
    return (
      <div className="flex justify-center text-white text-xs items-center bg-blue-800 rounded-full h-4 w-4">
        <span className="mb-0.5">{taskCount}</span>
      </div>
    );
  };

  return (
      <CalendarUIContext.Provider value={{ calendarTasks, isWeekendShowing, setIsWeekendShowing, weekOrMonth, setWeekOrMonth, calendarDate, setCalendarDate, getTaskCount, addTask, addTaskButton, fullCalendar }}>
        {children}
      </CalendarUIContext.Provider>
  );
};

export default CalendarUIProvider