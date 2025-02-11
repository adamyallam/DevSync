'use client'
import { parseISO, format } from 'date-fns';
import useCalendarUIContext from "@/utils/hooks/context/useCalendarUIContext";
import areDatesEqual from "@/utils/dateFunctions/areDatesEqual";
import { daysOfWeek, getStartOfWeek } from "@/utils/dateFunctions/getDateFunctions";
import useProjectsDataContext from '@/utils/hooks/context/useProjectDataProvider';
import { useParams } from 'next/navigation';
import CalendarTask from './CalendarTask';
import { WeeklyCalendarSkeleton } from '@/components/styledElements/LoadingElements';

export const WeeklyCalendar = () => {
  const { projects, loading } = useProjectsDataContext()
  const { isWeekendShowing, fullCalendar, calendarDate } = useCalendarUIContext();
  const { id } = useParams<{ id: string }>()

  const project = projects?.find((project) => project.id.toString() === id);
  const tasks = project?.tasks

  const weekStartEnd = { start: 0, end: 0 }

  if (loading) return <WeeklyCalendarSkeleton />
  if (!project || !tasks) return <div className=''>Can&apos;t retrieve data</div>;
  
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

  const getTaskCount = (date: string) => {
    const taskCount = tasks?.filter((task) => { return task.dueDate && format(new Date(task.dueDate), 'yyyy-MM-dd') === date }).length || 0;

    return (
      <div className="flex justify-center text-primary-text text-xs items-center bg-primary rounded-full h-5 w-5 font-semibold">
        <span className="mb-0.5">{taskCount}</span>
      </div>
    );
  };

  return (
    fullCalendar.slice(weekStartEnd.start, weekStartEnd.end).map((dateString, index) => {
      const parsedDate = parseISO(dateString);
      const formattedDate = format(parsedDate, 'yyyy-MM-dd');
      const currentDay = areDatesEqual(new Date(), parsedDate)

      const tasksByDate = tasks?.filter((task) => { return task.dueDate && format(new Date(task.dueDate), 'yyyy-MM-dd') === formattedDate }).map((task) => <CalendarTask key={String(task.id)} taskName={task.name || ''} taskId={task.id} />)

      return (
        <div key={index} className={`border border-undertone flex flex-col h-full ${isWeekendShowing ? `w-full` : `${index === 0 || index === 6 ? 'w-1/4' : 'w-full'}`}`}>

          <div className="min-h-[4.75rem] p-2 border-b-[5px] border-primary text-start">
            <div className="text-xs text-secondary-text font-bold">{daysOfWeek[parseISO(dateString).getDay()].slice(0, 3).toUpperCase()}</div>

            <div className={`mt-1 text-lg ${currentDay ? 'flex items-center justify-center border-2 border-undertone bg-primary w-9 h-8 rounded-md text-white' : 'text-primary-text font-semibold'}`}>{parseISO(dateString).getDate()}</div>
          </div>

          <div className="flex flex-col overflow-x-hidden overflow-y-auto items-center w-full h-full bg-[#B8B7B7] pt-4 pb-2">
            {isWeekendShowing ?
              (tasksByDate)
              :
              (index === 0 || index === 6 ? (getTaskCount(dateString)) : (tasksByDate))
            }
          </div>
        </div>
      )
    })
  )
}

export default WeeklyCalendar