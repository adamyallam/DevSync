'use client'
import useCalendarUIContext from '@/utils/hooks/context/useCalendarUIContext';

//Component imports
import WeeklyCalendar from './WeeklyCalendar';
import MonthlyCalendar from './MonthlyCalendar';

const Calendar = () => {
  const { weekOrMonth } = useCalendarUIContext();

  return (
    <div className="h-full w-full flex">
      {weekOrMonth === 'Week' ? (
          <WeeklyCalendar />
        ) : (
          <MonthlyCalendar />
        )
      }
    </div>
  );
};

export default Calendar