'use client'
import { parseISO, format } from 'date-fns';
import { useParams } from 'next/navigation';
import useCalendarUIContext from "@/utils/hooks/context/useCalendarUIContext";
import { getDaysInMonth, getFirstDayOfMonth, daysOfWeek } from "@/utils/dateFunctions/getDateFunctions";
import areDatesEqual from "@/utils/dateFunctions/areDatesEqual";
import useProjectsDataContext from '@/utils/hooks/context/useProjectDataProvider';
import CalendarTask from './CalendarTask';

export const MonthlyCalendar = () => {
  const { projects } = useProjectsDataContext()
  const { isWeekendShowing, fullCalendar, calendarDate } = useCalendarUIContext();
  const { id } = useParams<{ id: string }>()

  const project = projects?.find((project) => project.id.toString() === id);
  const tasks = project?.tasks

  const getTaskCount = (date: string) => {
    const taskCount = tasks?.filter((task) => { return task.dueDate && format(new Date(task.dueDate), 'yyyy-MM-dd') === date }).length || 0;

    return (
      <div className="flex justify-center text-primary-text text-xs items-center bg-primary rounded-full h-5 w-5 font-semibold">
        <span className="mb-0.5">{taskCount}</span>
      </div>
    );
  };

  if (!project || !tasks) {
    return <div className=''>Can&apos;t retrieve data</div>;
  }

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='flex w-full border-2 border-undertone'>
        {fullCalendar.slice(0, 7).map((dateString, index) => ( // Maps through the first week of the fullCalendar array     
          <div key={index} className={`${isWeekendShowing ? `w-full` : `${index === 0 || index === 6 ? 'w-1/5' : 'w-full'}`} bg-secondary`}>

            <div className={`p-1 pl-2 text-start font-bold text-primary-text text-xs w-full border-undertone ${(index === 0 || index === 5 || index === 6) ? (isWeekendShowing ? 'border-r-2' : '') : 'border-r-2'}`}>
              {!isWeekendShowing && (index === 0 || index === 6) ? <div /> : daysOfWeek[parseISO(dateString).getDay()].slice(0, 3).toUpperCase()}
            </div>

          </div>
        ))}
      </div>

      <div className={`grid ${fullCalendar.length >= 36 ? 'grid-rows-6' : 'grid-rows-5'} ${isWeekendShowing ? 'grid-cols-7' : 'grid-cols-[repeat(27,minmax(0,1fr))]'} pt-1 h-full w-full overflow-y-auto overflow-x-hidden `}>
        {fullCalendar.map((dateString, index) => { // Maps through the fullCalendar array
          const parsedDate = parseISO(dateString);
          const formattedDate = format(parsedDate, 'yyyy-MM-dd');
          const currentDay = areDatesEqual(new Date(), parsedDate)

          const columnIndex = index % 7;
          const isWeekend = columnIndex === 0 || columnIndex === 6;
          const isPrevMonthDay = index < getFirstDayOfMonth(calendarDate);
          const isNextMonthDay = index >= (getDaysInMonth(calendarDate) + getFirstDayOfMonth(calendarDate));

          const tasksByDate = tasks?.filter((task) => { return task.dueDate && format(new Date(task.dueDate), 'yyyy-MM-dd') === formattedDate }).map((task) => <CalendarTask key={String(task.id)} taskName={task.name || ''} taskId={task.id} />)

          return (
            <div key={index} className={`flex flex-col pl-2 pt-1 bg-[#B8B7B7] border border-undertone overflow-x-hidden overflow-y-auto ${isPrevMonthDay || isNextMonthDay ? 'bg-secondary' : ''} ${isWeekendShowing ? 'col-span-1' : (isWeekend ? 'col-span-1' : 'col-span-5')}`}>
              <div className={`flex items-center justify-between mr-2`}>
                <div className={`flex mb-2 ${currentDay ? 'items-center justify-center border-2 border-undertone w-8 h-7 rounded-md bg-secondary text-white font-semibold text-sm' : (isPrevMonthDay || isNextMonthDay ? 'text-primary-text text-sm font-semibold' : 'text-black font-semibold text-sm')}`}>
                  {parseISO(dateString).getDate()}
                </div>
              </div>

              <div className="flex flex-col items-center text-xs">
                {/*Determines if the tasks or a task count should display*/}
                {isWeekendShowing ?
                  (tasksByDate)
                  :
                  (isWeekend ? (getTaskCount(dateString)) : (tasksByDate))
                }
              </div>
            </div>
          )
        })}
        <div className={`bg-secondary w-screen ${fullCalendar.length >= 36 ? '' : 'hidden'}`} />
      </div>
    </div>
  )
}

export default MonthlyCalendar