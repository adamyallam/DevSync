'use client'
import useCalendarUIContext from "@/utils/hooks/useCalendarUIContext";

export const WeeklyCalendar = () => {
  const { isWeekendShowing, week, calendarTasks, getTaskCount, addTaskButton} = useCalendarUIContext();

  return (
    week.map((week, index) => {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();

      return (
        <div key={index} className={`border flex flex-col h-full ${isWeekendShowing ? `w-full` : `${index === 0 || index === 6 ? 'w-1/4' : 'w-full'}`}`}>

          <div className="min-h-[4.75rem] p-2 border-b text-start">
            <div className="text-sm font-semibold text-gray-600">{week.day}</div>

            <div className={`text-lg mt-1 ${currentDay === week.date ? 'flex items-center justify-center border bg-blue-500 w-9 h-8 rounded-md text-white' : ''}`}>{week.date}</div>
          </div>

          <div className="flex flex-col overflow-y-auto items-center flex-grow bg-gray-100 pt-4 pb-2">
            {isWeekendShowing ? 
              ( calendarTasks[index]?.map((task) => task) ) 
              : 
              ( index === 0 || index === 6 ? ( getTaskCount(index) ) : ( calendarTasks[index]?.map((task) => task) ) )
            }

            {(index !== 0 && index !== 6) || isWeekendShowing ? addTaskButton(index) : null}
          </div>
        </div>
      )
    })
  )
}

export default WeeklyCalendar