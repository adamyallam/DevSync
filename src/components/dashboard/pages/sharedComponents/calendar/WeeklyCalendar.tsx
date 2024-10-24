'use client'
import { parseISO } from 'date-fns';

import useCalendarUIContext from "@/utils/hooks/context/useCalendarUIContext";
import areDatesEqual from "@/utils/dateFunctions/areDatesEqual";
import { daysOfWeek, getStartOfWeek } from "@/utils/dateFunctions/getDateFunctions";

export const WeeklyCalendar = () => {
  // All states, functions and arrays handled within the CalendarUIProvider imported using useCalendarUIContext
  const { isWeekendShowing, calendarTasks, fullCalendar, calendarDate, getTaskCount, addTaskButton} = useCalendarUIContext();

  const weekStartEnd = {start: 0, end: 0}

  function setWeekStartEnd() {
    const startOfWeek = getStartOfWeek(calendarDate);
    
    const matchingIndex = fullCalendar.findIndex(dateString => 
      areDatesEqual(startOfWeek, parseISO(dateString))
    );
    
    if (matchingIndex !== -1) {
      weekStartEnd.start = matchingIndex;
      weekStartEnd.end = matchingIndex + 7;
    }
  }
  
  setWeekStartEnd();

  return (
    // Maps through a week of the fullCalendar array
    fullCalendar.slice(weekStartEnd.start, weekStartEnd.end).map((dateString, index) => {
      const currentDay = areDatesEqual(new Date(), parseISO(dateString))

      return (
        <div key={index} className={`border flex flex-col h-full ${isWeekendShowing ? `w-full` : `${index === 0 || index === 6 ? 'w-1/4' : 'w-full'}`}`}>

          <div className="min-h-[4.75rem] p-2 border-b text-start">
            <div className="text-sm font-semibold text-gray-600">{daysOfWeek[parseISO(dateString).getDay()].slice(0, 3).toUpperCase()}</div>

            <div className={`text-lg mt-1 ${currentDay ? 'flex items-center justify-center border bg-blue-500 w-9 h-8 rounded-md text-white' : ''}`}>{parseISO(dateString).getDate()}</div>
          </div>

          <div className="flex flex-col overflow-x-hidden overflow-y-auto items-center w-full h-full bg-gray-100 pt-4 pb-2">
            {isWeekendShowing ? // Determines if the tasks or a task count should display
              ( calendarTasks[dateString]?.map((task) => task) ) 
              : 
              ( index === 0 || index === 6 ? ( getTaskCount(dateString) ) : ( calendarTasks[dateString]?.map((task) => task) ) )
            }
            
            {(index !== 0 && index !== 6) || isWeekendShowing ? addTaskButton(dateString) : null}
          </div>
        </div>
      )
    })
  )
}

export default WeeklyCalendar