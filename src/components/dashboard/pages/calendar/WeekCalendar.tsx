'use client'
import React, { useState, useRef, useEffect} from 'react';
import { Plus } from 'lucide-react';
import useWeekDates from '@/utils/hooks/useWeekDates';
import useCalendarUIContext from '@/utils/hooks/useCalendarUIContext';

//Component imports

const WeekCalendar = () => {
  const weeks = useWeekDates()
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  const { isWeekendShowing, weekOrMonth } = useCalendarUIContext();

  const addTaskButton = (index: number) => {
    if(index !== 0 && index !== 6 || isWeekendShowing) {
      return (
        <button className="flex items-center gap-1 pb-2 font-semibold opacity-60 hover:opacity-100">
          <Plus size={18}/>
          Add Task
        </button>
      )
    }
    return null
  }

  return (
    <div className="h-full w-full flex border-t border-l">
      {weekOrMonth === 'Weeks' ? (

        weeks.map((week, index) => (
          <div key={index} className={`border-r border-b flex flex-col ${isWeekendShowing ? `w-full` : `${index === 0 || index === 6 ? 'w-1/4' : 'w-full'}`}`}>

            <div className="h-[4.5rem] p-2 border-b text-start">
              <div className="text-sm font-semibold text-gray-600">{week.day}</div>
              <div className={`text-lg mt-1 ${currentDay === week.date ? 'flex items-center justify-center border bg-blue-500 w-9 h-8 rounded-md text-white' : ''}`}>{week.date}</div>
            </div>

            <div className="flex flex-col items-center flex-grow bg-gray-100 pt-4">
              {addTaskButton(index)}
            </div>
          </div>
        ))

        ) : (

          <div>
            <div>
              <h1>random text</h1>
            </div>
          </div>

          )}
    </div>
  );
};

export default WeekCalendar