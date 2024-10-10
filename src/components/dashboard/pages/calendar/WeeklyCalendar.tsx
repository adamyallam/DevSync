'use client'
import useCalendarUIContext from "@/utils/hooks/useCalendarUIContext";

export const WeeklyCalendar = () => {
  // All states, functions and arrays handled within the CalendarUIProvider imported using useCalendarUIContext
  const { isWeekendShowing, calendarTasks, fullCalendar, getTaskCount, addTaskButton} = useCalendarUIContext();

  const getWeekStartEnd = (inputDate?: Date) => {  // Gets the start and end of week then adds the appropriate amount so the slice() method functions correctly to display a week of a month
    const currentDate = inputDate || new Date();
    const currentDay = currentDate.getDay();

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay);

    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() + (6 - currentDay)); 

    return {
      start: startOfWeek.getDate() + 1,
      end: endOfWeek.getDate() + 2
    };
  };

  return (
    // Maps through a single week of the fullCalendar array
    fullCalendar.slice( getWeekStartEnd().start, getWeekStartEnd().end ).map((date, index) => {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const calendarIndex = fullCalendar.findIndex(calendarDate => calendarDate.date === date.date); // Gets the index the current date is at in the fullCalendar array

      return (
        <div key={index} className={`border flex flex-col h-full ${isWeekendShowing ? `w-full` : `${index === 0 || index === 6 ? 'w-1/4' : 'w-full'}`}`}>

          <div className="min-h-[4.75rem] p-2 border-b text-start">
            <div className="text-sm font-semibold text-gray-600">{date.day}</div>

            <div className={`text-lg mt-1 ${currentDay === date.date.getDate() ? 'flex items-center justify-center border bg-blue-500 w-9 h-8 rounded-md text-white' : ''}`}>{date.date.getDate()}</div>
          </div>

          <div className="flex flex-col overflow-x-hidden overflow-y-auto items-center flex-grow bg-gray-100 pt-4 pb-2">
            {isWeekendShowing ? // Checks to see if the tasks or a task count should display
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