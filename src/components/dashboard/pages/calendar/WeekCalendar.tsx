'use client'
import React, { useState, useRef, useEffect} from 'react';
import { Plus } from 'lucide-react';
import useWeekDays from '@/utils/hooks/useWeekDays';
import useCalendarUIContext from '@/utils/hooks/useCalendarUIContext';

//Component imports
import MonthCalendar from './MonthCalendar';
import AutoResizingInput from '@/components/styledElements/AutoResizingInput';

const WeekCalendar = () => {
  const { isWeekendShowing, weekOrMonth } = useCalendarUIContext();

  const week = useWeekDays()
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  const [initialWidth, setInitialWidth] = useState<number>(250)
  const [calendarTasks, setCalendarTasks] = useState<JSX.Element[][]>(
    Array.from({ length: week.length }, () => [])
  );

  useEffect(() => {
    setInitialWidth(isWeekendShowing ? 200 : 250)
  }, [isWeekendShowing])

  useEffect(() => {
    setCalendarTasks((parentArray) =>
      parentArray.map((childArray, _) => {
        if (!childArray) return [];
        return childArray.map((_, taskIndex) => (
          <div key={taskIndex} className='pb-2'>
            <AutoResizingInput initialWidth={initialWidth} maxGrowthWidth={initialWidth} />
          </div>
        ));
      })
    );
  }, [initialWidth]);

  const addTask = (index: number) => {
    const calendarTask = <div key={calendarTasks[index]?.length || 0} className='pb-2'><AutoResizingInput initialWidth={initialWidth} maxGrowthWidth={initialWidth} /></div>

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

    if(index !== 0 && index !== 6 || isWeekendShowing) {
      return (
        <button onClick={() => {addTask(index)}} className="flex items-center gap-1 pb-2 font-semibold opacity-60 hover:opacity-100">
          <Plus size={18}/>
          Add Task
        </button>
      )
    }
    return null
  }

  const getTaskCount = (index: number) => (
    <div className='flex flex-col items-center'>
      <span>{calendarTasks[index]?.length || 0}</span>
      <span>Tasks</span>
    </div>
  );

  return (
    <div className="h-full w-full flex border-t border-l">
      {weekOrMonth === 'Weeks' ? (

        week.map((week, index) => (
          <div key={index} className={`border-r border-b flex flex-col ${isWeekendShowing ? `w-full` : `${index === 0 || index === 6 ? 'w-1/4' : 'w-full'}`}`}>

            <div className="h-[4.5rem] p-2 border-b text-start">
              <div className="text-sm font-semibold text-gray-600">{week.day}</div>
              <div className={`text-lg mt-1 ${currentDay === week.date ? 'flex items-center justify-center border bg-blue-500 w-9 h-8 rounded-md text-white' : ''}`}>{week.date}</div>
            </div>

            <div className="flex flex-col items-center flex-grow bg-gray-100 pt-4">
              {isWeekendShowing ? 
                ( calendarTasks[index]?.map((task) => task) ) 
                : 
                ( index === 0 || index === 6 ? 
                  (getTaskCount(index))
                  : 
                  (calendarTasks[index]?.map((task) => task)) 
                )
              }

              {addTaskButton(index)}
            </div>
          </div>
        ))

        ) : (

          <MonthCalendar />

          )}
    </div>
  );
};

export default WeekCalendar