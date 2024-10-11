'use client'
import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronDown, Check } from "lucide-react"
import useCalendarUIContext from "@/utils/hooks/useCalendarUIContext"

//component imports


const CalendarManager = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const { isWeekendShowing, setIsWeekendShowing, weekOrMonth, setWeekOrMonth } = useCalendarUIContext();

  const handleOptionClick = (option: string) => {
    setWeekOrMonth(option);
    setIsOpen(false);
  };

  return (
    <div className="pt-3 pb-3 flex justify-between">
      <div className="flex items-center ml-8">

        <button className="border border-gray-400 text-sm w-12 h-7 rounded-md">Today</button>

        <div className="flex items-center gap-2 ml-3">
          <button><ChevronLeft strokeWidth={1.5}/></button>
          <button><ChevronRight strokeWidth={1.5}/></button>
        </div>

        <span className="ml-2 text-lg">Temp Date</span>
      </div>
      
      <div className="flex mr-8 gap-5">
        <div className="relative gap-4 self-center">

          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center border border-gray-400 rounded-md h-7">
            <span className="pl-2 pr-2">{weekOrMonth}</span>
            <div className="place-content-center pt-1 pl-1 pr-1 border-l border-gray-400 h-7">
              <ChevronDown size={16} />
            </div>
          </button>

          {isOpen && (
            <div className="absolute mt-1 w-28 bg-white border border-gray-300 rounded-md shadow-md z-10">

              <button onClick={() => handleOptionClick('Week')}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${weekOrMonth === 'Week' ? 'bg-gray-100' : ''}`}>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4"><Check className={`${weekOrMonth === 'Week' ? '' : 'hidden'}`} size={16}/></div>
                  <div>Week</div>
                </div>
              </button>

              <button onClick={() => handleOptionClick('Month')}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${weekOrMonth === 'Month' ? 'bg-gray-100' : ''}`}>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4"><Check className={`${weekOrMonth === 'Month' ? '' : 'hidden'}`} size={16}/></div>
                  <div>Month</div>
                </div>
              </button>
              
            </div>
          )}
        </div>

        <button onClick={() => {setIsWeekendShowing(!isWeekendShowing)}} className={`group text-sm`}>
          Weekends
          <div className={`bg-red-600 h-[3px] w-full`}>
            <div className={`bg-green-500 w-0 h-[3px] transition-all duration-300 ${isWeekendShowing ? 'w-full group-hover:w-3/4' : 'group-hover:w-1/4'}`} />
          </div>
        </button>
      </div>
    </div>
  )
}

export default CalendarManager