'use client'
import { useState, useRef } from "react";
import { Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { getStartOfWeek, monthsOfYear } from "@/utils/dateFunctions/getDateFunctions";
import useCalendarUIContext from "@/utils/hooks/context/useCalendarUIContext";
import useMenuClose from "@/utils/hooks/useMenuClose";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import { CalendarManagerSkeleton } from "@/components/styledElements/LoadingElements";

const CalendarManager = () => {
  const { loading } = useProjectsDataContext()
  const { isWeekendShowing, setIsWeekendShowing, weekOrMonth, setWeekOrMonth, calendarDate, setCalendarDate } = useCalendarUIContext();

  const [isOpen, setIsOpen] = useState(false);
  const startOfWeek = getStartOfWeek();

  const calendarViewButtonRef = useRef<HTMLButtonElement>(null)
  const calendarViewMenuRef = useRef<HTMLDivElement>(null)

  useMenuClose(calendarViewMenuRef, calendarViewButtonRef, isOpen, setIsOpen)

  if (loading) return <CalendarManagerSkeleton />

  const handleOptionClick = (option: string) => {
    setWeekOrMonth(option);
    setIsOpen(false);
  };

  // Moves the calendar date forward by a week or month depending on the weekOrMonth state
  const moveCalendarDateFoward = () => {
    if (weekOrMonth === 'Month') {
      const nextDate = new Date(calendarDate);
      nextDate.setMonth(nextDate.getMonth() + 1);

      if (nextDate.getMonth() === new Date().getMonth()) {
        nextDate.setDate(startOfWeek.getDate());
      } else {
        nextDate.setDate(7)
      }

      setCalendarDate(nextDate);
    } else {
      const nextDate = new Date(calendarDate);
      nextDate.setDate(nextDate.getDate() + 7);

      setCalendarDate(nextDate);
    }
  }

  // Moves the calendar date back by a week or month depending on the weekOrMonth state
  const moveCalendarDateBack = () => {
    if (weekOrMonth === 'Month') {
      const previousDate = new Date(calendarDate);
      previousDate.setMonth(previousDate.getMonth() - 1);

      if (previousDate.getMonth() === new Date().getMonth()) {
        previousDate.setDate(startOfWeek.getDate());
      } else {
        previousDate.setDate(7)
      }

      setCalendarDate(previousDate);
    } else {
      const previousDate = new Date(calendarDate);
      previousDate.setDate(previousDate.getDate() - 7);

      setCalendarDate(previousDate);
    }
  }

  // Moves the calendar date to the current date
  const moveCalendarDateToday = () => {
    setCalendarDate(new Date());
  }

  return (
    <div className="pt-3 pb-3 flex justify-between">
      <div className="flex items-center ml-8">

        <button onClick={() => moveCalendarDateToday()} className="w-14 h-7 hover:bg-button-hover hover:scale-105 transition-transform outline-2 outline outline-primary rounded-sm text-white text-xs font-semibold">Today</button>

        <div className="flex items-center gap-2 ml-3">
          <button onClick={() => moveCalendarDateBack()} className="text-primary-text hover:scale-110 transition-transform hover:text-secondary-text"><ChevronLeft strokeWidth={1.5} /></button>
          <button onClick={() => moveCalendarDateFoward()} className="text-primary-text hover:scale-110 transition-transform hover:text-secondary-text"><ChevronRight strokeWidth={1.5} /></button>
        </div>

        <span className="ml-2 text-primary-text">{monthsOfYear[calendarDate.getMonth()]} {calendarDate.getFullYear()}</span>
      </div>

      <div className="flex mr-8 gap-5">
        <div className="relative gap-4 self-center">

          <button ref={calendarViewButtonRef} onClick={() => setIsOpen(!isOpen)} className="flex items-center rounded-sm h-7 border border-primary text-primary-text text-sm hover:bg-button-hover hover:scale-105 transition-transform font-semibold hover:text-white">
            <span className="pl-2">{weekOrMonth}</span>
            <div className="place-content-center pt-1 pl-0.5 pr-0.5 h-7">
              <ChevronDown size={16} strokeWidth={2.5} />
            </div>
          </button>

          {isOpen && (
            <div ref={calendarViewMenuRef} className="absolute w-24 bg-primary border-2 border-undertone rounded-md shadow-md z-10">

              <button onClick={() => handleOptionClick('Week')}
                className={`block w-full text-left px-4 py-1 hover:bg-highlighted text-xs`}>
                <div className="flex items-center justify-center gap-1 text-primary-text">
                  <div className="flex gap-1 items-center"><Check className={`${weekOrMonth === 'Week' ? '' : 'hidden'}`} size={12} strokeWidth={3} />Week</div>
                </div>
              </button>

              <button onClick={() => handleOptionClick('Month')}
                className={`block w-full text-left px-4 py-1 hover:bg-highlighted text-xs border-t border-t-undertone`}>
                <div className="flex items-center justify-center gap-1 text-primary-text">
                  <div className="flex gap-1 items-center"><Check className={`${weekOrMonth === 'Month' ? '' : 'hidden'}`} size={12} strokeWidth={3} />Month</div>
                </div>
              </button>

            </div>
          )}
        </div>

        <button onClick={() => { setIsWeekendShowing(!isWeekendShowing) }} className={`flex gap-1 group items-center text-xs font-semibold text-primary-text hover:scale-105 hover:text-white transition-transform`}>
          Weekends
          <Check size={14} strokeWidth={3} className={`${isWeekendShowing ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
        </button>
      </div>
    </div>
  )
}

export default CalendarManager