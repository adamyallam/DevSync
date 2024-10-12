'use client'
import { useState, createContext, useEffect } from 'react';
import { Plus } from 'lucide-react';
import useCalendar from '@/utils/hooks/useCalendar';
import {getStartOfWeek} from '@/utils/dateFunctions/getDateFunctions';
import compareDates from '@/utils/dateFunctions/compareDates';

//Component Imports
import AutoResizingInput from '@/components/styledElements/AutoResizingInput';

type CalendarUIContextProps = {
  fullCalendar: {date: Date, day: String}[],
  calendarTasks: JSX.Element[][]; 
  isWeekendShowing: boolean;
  setIsWeekendShowing: React.Dispatch<React.SetStateAction<boolean>>;
  weekOrMonth: string;
  setWeekOrMonth: React.Dispatch<React.SetStateAction<string>>;
  calendarDate: Date;
  setCalendarDate: React.Dispatch<React.SetStateAction<Date>>;
  weekStartEnd: {start: number, end: number};
  getTaskCount: (index: number) => JSX.Element;
  addTask: (date: Date) => void;
  addTaskButton: (date: Date) => JSX.Element;
};

export const CalendarUIContext = createContext<CalendarUIContextProps | undefined>(undefined);

interface Props {
  children: React.ReactNode
}

export const CalendarUIProvider: React.FC<Props> = ({ children }) => {
  const [isWeekendShowing, setIsWeekendShowing] = useState<boolean>(false);
  const [weekOrMonth, setWeekOrMonth] = useState<string>('Week');
  const [initialWidth, setInitialWidth] = useState<number>(240)
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [weekStartEnd, setWeekStartEnd] = useState<{start: number, end: number}>({start: 0, end: 7})

  const fullCalendar = useCalendar(calendarDate)

  useEffect(() => { // Sets the start and end index of the week in the fullCalendar array so that the WeeklyCalendar component can map through the correct week
    const startOfWeek = getStartOfWeek(calendarDate);

    fullCalendar.some((calendarDate, index) => {
      const calendarIndex = fullCalendar.findIndex(calendarItem => compareDates(calendarItem.date, startOfWeek));
    
      if (calendarIndex === index) {
        setWeekStartEnd({ start: calendarIndex, end: calendarIndex + 7 });
        return true;
      }

      return false;
    });

  }, [calendarDate, fullCalendar]);

  const [calendarTasks, setCalendarTasks] = useState<JSX.Element[][]>(
    Array.from({ length: fullCalendar.length }, () => [])
  );

  useEffect(() => {
    setInitialWidth(isWeekendShowing ? 175 : 240)
  }, [isWeekendShowing])

  useEffect(() => { // Updates the size of the AutoResizingInput and/or the styling whenever initialWidth or weekOrMonth changes. 
    setCalendarTasks((parentArray) =>
      parentArray.map((childArray, _) => {
        if (!childArray) return [];
        return childArray.map((_, taskIndex) => (
          <div key={taskIndex} className={weekOrMonth === 'Week' ? 'pb-2' : 'pb-1 text-xs'}>
            <AutoResizingInput className={weekOrMonth === 'Week' ? '' : 'bg-gray-100'} initialWidth={initialWidth} maxGrowthWidth={initialWidth} />
          </div>
        ));
      })
    );
  }, [initialWidth, weekOrMonth]);

  // Adds a task to the calendarTasks array at the appropriate index
  const addTask = (date: Date) => {
    const calendarIndex = fullCalendar.findIndex(calendarIndex => calendarIndex.date === date);
    const calendarTask = <div key={calendarTasks[calendarIndex]?.length || 0} className={weekOrMonth === 'Week' ? 'pb-2' : 'pb-1 text-xs'}><AutoResizingInput className={weekOrMonth === 'Week' ? '' : 'bg-gray-200'} initialWidth={initialWidth} maxGrowthWidth={initialWidth} /></div>

    setCalendarTasks((prevArrays) => {
      const updatedTasks = [...prevArrays];
      if (!updatedTasks[calendarIndex]) {
        updatedTasks[calendarIndex] = [];
      }
      updatedTasks[calendarIndex].push(calendarTask)
      return updatedTasks;
    });
  };

  //Function to display the addTaskButton
  const addTaskButton = (date: Date) => {
    return (
      <button onClick={() => {addTask(date)}} className={`flex items-center pb-2 font-semibold opacity-80 hover:opacity-100 ${weekOrMonth === 'Month' ? 'text-xs' : ''}`}>
        <Plus size={weekOrMonth === 'Week' ? 17 : 12} strokeWidth={2.5}/>
        Add Task
      </button>
    )
  }

  //Gets a task count for number of tasks within a date
  const getTaskCount = (index: number) => (
    <div className='flex justify-center text-white text-xs items-center bg-blue-800 rounded-full h-4 w-4'>
      <span className='mb-0.5'>{calendarTasks[index]?.length || 0}</span>
    </div>
  );

  return (
      <CalendarUIContext.Provider value={{ calendarTasks, isWeekendShowing, setIsWeekendShowing, weekOrMonth, setWeekOrMonth, calendarDate, setCalendarDate, getTaskCount, addTask, addTaskButton, fullCalendar, weekStartEnd }}>
        {children}
      </CalendarUIContext.Provider>
  );
};

export default CalendarUIProvider