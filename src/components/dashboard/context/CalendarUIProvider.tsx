'use client'
import { useState, createContext, useEffect } from 'react';
import useCalendarMonth from '@/utils/hooks/useCalendarMonth';
import useCalendarWeek from '@/utils/hooks/useCalendarWeek';
import { Plus } from 'lucide-react';

//Component Imports
import AutoResizingInput from '@/components/styledElements/AutoResizingInput';

type CalendarUIContextProps = {
  week: { day: string; date: number }[],
  month: number[],
  calendarTasks: JSX.Element[][]; 
  isWeekendShowing: boolean;
  setIsWeekendShowing: React.Dispatch<React.SetStateAction<boolean>>;
  weekOrMonth: string;
  setWeekOrMonth: React.Dispatch<React.SetStateAction<string>>;
  getTaskCount: (index: number) => JSX.Element;
  addTask: (index: number) => void;
  addTaskButton: (index: number) => JSX.Element;
};

export const CalendarUIContext = createContext<CalendarUIContextProps | undefined>(undefined);

interface Props {
  children: React.ReactNode
}

export const CalendarUIProvider: React.FC<Props> = ({ children }) => {
  const [isWeekendShowing, setIsWeekendShowing] = useState<boolean>(false);
  const [weekOrMonth, setWeekOrMonth] = useState<string>('Week');

  const week = useCalendarWeek()
  const month = useCalendarMonth()

  const [initialWidth, setInitialWidth] = useState<number>(240)

  useEffect(() => {
    setInitialWidth(isWeekendShowing ? 175 : 240)
  }, [isWeekendShowing])

  useEffect(() => {
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

  const [calendarTasks, setCalendarTasks] = useState<JSX.Element[][]>(
    Array.from({ length: week.length }, () => [])
  );

  const addTask = (index: number) => {
    const calendarTask = <div key={calendarTasks[index]?.length || 0} className={weekOrMonth === 'Week' ? 'pb-2' : 'pb-1 text-xs'}><AutoResizingInput className={weekOrMonth === 'Week' ? '' : 'bg-gray-100'} initialWidth={initialWidth} maxGrowthWidth={initialWidth} /></div>

    setCalendarTasks((prevArrays) => {
      const updatedTasks = [...prevArrays];
      if (!updatedTasks[index]) {
        updatedTasks[index] = [];
      }
      updatedTasks[index].push(calendarTask)
      return updatedTasks;
    });
  };

  const addTaskButton = (index: number) => {
    return (
      <button onClick={() => {addTask(index)}} className={`flex items-center pb-2 font-semibold opacity-80 hover:opacity-100 ${weekOrMonth === 'Month' ? 'text-xs' : ''}`}>
        <Plus size={weekOrMonth === 'Week' ? 18 : 14}/>
        Add Task
      </button>
    )
  }

  const getTaskCount = (index: number) => (
    <div className='flex justify-center text-white text-xs items-center bg-blue-800 rounded-full h-4 w-4'>
      <span className='mb-0.5'>{calendarTasks[index]?.length || 0}</span>
    </div>
  );

  return (
      <CalendarUIContext.Provider value={{ week, month, calendarTasks, isWeekendShowing, setIsWeekendShowing, weekOrMonth, setWeekOrMonth, getTaskCount, addTask, addTaskButton }}>
        {children}
      </CalendarUIContext.Provider>
  );
};

export default CalendarUIProvider