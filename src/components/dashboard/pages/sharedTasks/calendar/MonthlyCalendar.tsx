'use client'
import useCalendarUIContext from "@/utils/hooks/context/useCalendarUIContext";
import { getDaysInMonth, getFirstDayOfMonth } from "@/utils/dateFunctions/getDateFunctions";
import { Plus } from "lucide-react";

export const MonthlyCalendar = () => {
  // All states, functions and arrays handled within the CalendarUIProvider imported using useCalendarUIContext
  const { isWeekendShowing, fullCalendar, calendarTasks, calendarDate, getTaskCount, addTask, addTaskButton } = useCalendarUIContext();

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='flex w-full border'>
        {fullCalendar.slice(0, 7).map((date, index) => ( //maps through the first 7 items of the fullCalendar array to display sun - sat               
          <div className={`${isWeekendShowing ? `w-full` : `${index === 0 || index === 6 ? 'w-1/5' : 'w-full'}`}`}>

            <div className={`p-1 pl-2 text-start font-semibold text-gray-600 text-xs w-full ${(index === 0 || index === 5 || index === 6) ? (isWeekendShowing ? 'border-r' : '') : 'border-r'}`}>
                {!isWeekendShowing && (index === 0 || index === 6) ? <div /> : date.day}
            </div>

          </div>
        ))}
      </div>

      <div className={`grid ${fullCalendar.length === 36 ? 'grid-rows-6' : 'grid-rows-5'} ${isWeekendShowing ? 'grid-cols-7' : 'grid-cols-[repeat(27,minmax(0,1fr))]'} pt-1 h-full w-full overflow-y-auto overflow-x-hidden`}> 
        {fullCalendar.map((date, index) => {
          const currentDate = calendarDate;
          const currentDay = currentDate.getDate();
          const columnIndex = index % 7; 
          const isWeekend = columnIndex === 0 || columnIndex === 6;
          const isPrevMonthDay = index < getFirstDayOfMonth(calendarDate);
          const isNextMonthDay = index >= (getDaysInMonth(calendarDate) + getFirstDayOfMonth(calendarDate));
          

          const plusTaskButton = <button className="opacity-80"><Plus onClick={() => addTask(date.date)} size={14} strokeWidth={3}/></button>

          console.log(date.date)

          return (
            <div key={index} className={`flex flex-col pl-2 pt-1 border overflow-x-hidden overflow-y-auto ${isPrevMonthDay || isNextMonthDay ? 'bg-gray-100' : ''} ${isWeekendShowing ? 'col-span-1' : (isWeekend ? 'col-span-1' : 'col-span-5')}`}>
              <div className={`flex items-center justify-between mr-2`}>
                <div className={`flex mb-2 ${currentDay === date.date.getDate() ? 'items-center justify-center border bg-blue-500 w-6 h-7 rounded-md text-white' : ''}`}>
                  {date.date.getDate()}
                </div>

                  {/*Determines when and if an addTaskButton or plusTaskButton should display*/}
                  {currentDay === date.date.getDate() ? (!isWeekend ? addTaskButton(date.date) : (isWeekendShowing ? addTaskButton(date.date) : null)) 
                  : 
                  (!isWeekend ? plusTaskButton : (isWeekendShowing ? plusTaskButton : null)) }
              </div>

              <div className="flex flex-col items-center text-xs">
                {/*Determines if the tasks or a task count should display*/}
                {isWeekendShowing ?
                  ( calendarTasks[index]?.map((task) => task) )
                  :
                  ( isWeekend ? (getTaskCount(index)) : (calendarTasks[index]?.map((task) => task)) )
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