'use client'
import React, { useState, useRef, useEffect} from 'react';
import { Plus } from 'lucide-react';
import useCalendarWeek from '@/utils/hooks/useCalendarWeek';
import useCalendarMonth from '@/utils/hooks/useCalendarMonth';
import { getDaysInMonth, getStartDayOfMonth } from '@/utils/hooks/useCalendarMonth';
import useCalendarUIContext from '@/utils/hooks/useCalendarUIContext';

//Component imports
import AutoResizingInput from '@/components/styledElements/AutoResizingInput';

const Calendar = () => {
  const { isWeekendShowing, weekOrMonth } = useCalendarUIContext();
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  const week = useCalendarWeek()
  const month = useCalendarMonth()

  const [initialWidth, setInitialWidth] = useState<number>(250)
  const [calendarTasks, setCalendarTasks] = useState<JSX.Element[][]>(
    Array.from({ length: week.length }, () => [])
  );

  useEffect(() => {
    setInitialWidth(isWeekendShowing ? 185 : 250)
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
    <div className='flex justify-center text-white text-sm items-center bg-blue-500 rounded-full h-6 w-6'>
      <span className='mb-0.5'>{calendarTasks[index]?.length || 0}</span>
    </div>
  );

  return (
    <div className="h-full w-full flex">
      {weekOrMonth === 'Week' ? (
        week.map((week, index) => (
          <div key={index} className={`border flex flex-col h-full ${isWeekendShowing ? `w-full` : `${index === 0 || index === 6 ? 'w-1/4' : 'w-full'}`}`}>

            <div className="min-h-[4.75rem] p-2 border-b text-start">
              <div className="text-sm font-semibold text-gray-600">{week.day}</div>
              <div className={`text-lg mt-1 ${currentDay === week.date ? 'flex items-center justify-center border bg-blue-500 w-9 h-8 rounded-md text-white' : ''}`}>{week.date}</div>
            </div>

            <div className="flex flex-col overflow-y-auto items-center flex-grow bg-gray-100 pt-4 pb-2">
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
          <div className='flex flex-col h-full w-full'>
            <div className={`flex w-full border`}>
              {week.map((week, index) => (                
                <div className={`${isWeekendShowing ? `w-full` : `${index === 0 || index === 6 ? 'w-1/5' : 'w-full'}`}`}>
                  <div className={`p-1 pl-2 text-start font-semibold text-gray-600 text-xs w-full ${(index === 0 || index === 5 || index === 6) ? (isWeekendShowing ? 'border-r' : '') : 'border-r'}`}>{!isWeekendShowing && (index === 0 || index === 6) ? <div /> : week.day}</div>
                </div>
              ))}
            </div>

            <div className={`grid grid-rows-5 pt-1 h-full w-full ${isWeekendShowing ? 'grid-cols-7' : 'grid-cols-[repeat(27,minmax(0,1fr))]'}`}>
              {month.map((day, index) => {
                const columnIndex = index % 7;
                const isWeekend = columnIndex === 0 || columnIndex === 6;

                const isPrevMonthDay = index < getStartDayOfMonth();
                const isNextMonthDay = index >= (getDaysInMonth() + getStartDayOfMonth());

                return (
                  <div key={index} className={`pl-2 pt-1 border ${isPrevMonthDay || isNextMonthDay ? 'bg-gray-100' : ''} ${isWeekendShowing ? 'col-span-1' : (isWeekend ? 'col-span-1' : 'col-span-5')}`}>{day}</div>
                );
              })}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Calendar