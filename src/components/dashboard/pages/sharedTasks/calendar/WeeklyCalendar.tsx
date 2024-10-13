'use client'
import useCalendarUIContext from "@/utils/hooks/context/useCalendarUIContext";
import areDatesEqual from "@/utils/dateFunctions/areDatesEqual";

export const WeeklyCalendar = () => {
  // All states, functions and arrays handled within the CalendarUIProvider imported using useCalendarUIContext
  const { isWeekendShowing, calendarTasks, fullCalendar, calendarDate, getTaskCount, addTaskButton, weekStartEnd} = useCalendarUIContext();

  return (
    // Maps through a week of the fullCalendar array
    fullCalendar.slice( weekStartEnd.start, weekStartEnd.end ).map((date, index) => {
      const currentDate = new Date();
      const currentDay = areDatesEqual(currentDate, date.date)
      const calendarIndex = fullCalendar.findIndex(calendarItem => calendarItem.date === date.date); // Gets the index the current date is at in the fullCalendar array

      return (
        <div key={index} className={`border flex flex-col h-full ${isWeekendShowing ? `w-full` : `${index === 0 || index === 6 ? 'w-1/4' : 'w-full'}`}`}>

          <div className="min-h-[4.75rem] p-2 border-b text-start">
            <div className="text-sm font-semibold text-gray-600">{date.day}</div>

            <div className={`text-lg mt-1 ${currentDay ? 'flex items-center justify-center border bg-blue-500 w-9 h-8 rounded-md text-white' : ''}`}>{date.date.getDate()}</div>
          </div>

          <div className="flex flex-col overflow-x-hidden overflow-y-auto items-center flex-grow bg-gray-100 pt-4 pb-2">
            {isWeekendShowing ? // Determines if the tasks or a task count should display
              ( calendarTasks[calendarIndex]?.map((task) => task) ) 
              : 
              ( index === 0 || index === 6 ? ( getTaskCount(calendarIndex) ) : ( calendarTasks[calendarIndex]?.map((task) => task) ) )
            }
            
            {(index !== 0 && index !== 6) || isWeekendShowing ? addTaskButton(date.date) : null}
          </div>
        </div>
      )
    })
  )
}

export default WeeklyCalendar