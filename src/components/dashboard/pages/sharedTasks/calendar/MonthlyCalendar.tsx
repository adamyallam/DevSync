'use client'
import useCalendarUIContext from "@/utils/hooks/context/useCalendarUIContext";
import { getDaysInMonth, getFirstDayOfMonth } from "@/utils/dateFunctions/getDateFunctions";
import areDatesEqual from "@/utils/dateFunctions/areDatesEqual";
import { daysOfWeek } from "@/utils/dateFunctions/getDateFunctions";
import { Plus } from "lucide-react";
import { parseISO } from 'date-fns';

export const MonthlyCalendar = () => {
  // All states, functions and arrays handled within the CalendarUIProvider imported using useCalendarUIContext
  const { isWeekendShowing, fullCalendar, calendarTasks, calendarDate, getTaskCount, addTask, addTaskButton } = useCalendarUIContext();

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='flex w-full border'>
        {fullCalendar.slice(0, 7).map((dateString, index) => ( // Maps through the first week of the fullCalendar array     
          <div key={index} className={`${isWeekendShowing ? `w-full` : `${index === 0 || index === 6 ? 'w-1/5' : 'w-full'}`}`}>

            <div className={`p-1 pl-2 text-start font-semibold text-gray-600 text-xs w-full ${(index === 0 || index === 5 || index === 6) ? (isWeekendShowing ? 'border-r' : '') : 'border-r'}`}>
                {!isWeekendShowing && (index === 0 || index === 6) ? <div /> : daysOfWeek[parseISO(dateString).getDay()].slice(0, 3).toUpperCase()}
            </div>

          </div>
        ))}
      </div>

      <div className={`grid ${fullCalendar.length === 36 ? 'grid-rows-6' : 'grid-rows-5'} ${isWeekendShowing ? 'grid-cols-7' : 'grid-cols-[repeat(27,minmax(0,1fr))]'} pt-1 h-full w-full overflow-y-auto overflow-x-hidden`}> 
        {fullCalendar.map((dateString, index) => { // Maps through the fullCalendar array
          const currentDate = new Date();
          const currentDay = areDatesEqual(currentDate, parseISO(dateString));
          const columnIndex = index % 7; 
          const isWeekend = columnIndex === 0 || columnIndex === 6;
          const isPrevMonthDay = index < getFirstDayOfMonth(calendarDate);
          const isNextMonthDay = index >= (getDaysInMonth(calendarDate) + getFirstDayOfMonth(calendarDate));
          

          const plusTaskButton = <button className="opacity-80"><Plus onClick={() => addTask(dateString)} size={14} strokeWidth={3}/></button>

          return (
            <div key={index} className={`flex flex-col pl-2 pt-1 border overflow-x-hidden overflow-y-auto ${isPrevMonthDay || isNextMonthDay ? 'bg-gray-100' : ''} ${isWeekendShowing ? 'col-span-1' : (isWeekend ? 'col-span-1' : 'col-span-5')}`}>
              <div className={`flex items-center justify-between mr-2`}>
                <div className={`flex mb-2 ${currentDay ? 'items-center justify-center border bg-blue-500 w-6 h-7 rounded-md text-white' : ''}`}>
                  {parseISO(dateString).getDate()}
                </div>

                  {/*Determines when and if an addTaskButton or plusTaskButton should display*/}
                  {currentDay ? (!isWeekend ? addTaskButton(dateString) : (isWeekendShowing ? addTaskButton(dateString) : null)) 
                  : 
                  (!isWeekend ? plusTaskButton : (isWeekendShowing ? plusTaskButton : null)) }
              </div>

              <div className="flex flex-col items-center text-xs">
                {/*Determines if the tasks or a task count should display*/}
                {isWeekendShowing ?
                  ( calendarTasks[dateString]?.map((task) => task) )
                  :
                  ( isWeekend ? (getTaskCount(dateString)) : (calendarTasks[dateString]?.map((task) => task)) )
                }
              </div>
            </div>
          )
        })}
        <div className={`bg-gray-100 w-screen ${fullCalendar.length === 36 ? '' : 'hidden'}`}/>
      </div>
    </div>
  )
}

export default MonthlyCalendar