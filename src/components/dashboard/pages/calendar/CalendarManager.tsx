'use client'
import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ChevronDown, Check } from "lucide-react"

//component imports
import AddTaskHeaderButton from "@/components/styledElements/AddTaskHeaderButton"

const CalendarManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Weeks');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="pt-1 pb-1 flex justify-between">
      <div className="flex items-center">
        <AddTaskHeaderButton showFilterSort={false} />
        <div className="mr-5 ml-5 border-r-2 border-gray-200 h-6"/>

        <button className="border border-gray-400 text-sm w-12 h-7 rounded-md">Today</button>
        <div className="flex items-center gap-2 ml-3">
          <button><ChevronLeft strokeWidth={1.5}/></button>
          <button><ChevronRight strokeWidth={1.5}/></button>
        </div>
        <span className="ml-2 text-lg">Temp Date</span>
      </div>
      
      <div className="relative self-center mr-14">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center border border-gray-400 rounded-md h-7">
          <span className="pl-2 pr-2">{selectedOption}</span>
          <div className="place-content-center pt-1 pl-1 pr-1 border-l border-gray-400 h-7">
            <ChevronDown size={16} />
          </div>
        </button>

        {isOpen && (
          <div className="absolute mt-1 w-28 bg-white border border-gray-300 rounded-md shadow-md z-10">
            <Link href={'/dashboard/tasks/calendar/week'} onClick={() => handleOptionClick('Weeks')} 
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedOption === 'Weeks' ? 'bg-gray-100' : ''}`}>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4"><Check className={`${selectedOption === 'Weeks' ? '' : 'hidden'}`} size={16}/></div>
                <div>Weeks</div>
              </div>
            </Link>

            <Link href={'/dashboard/tasks/calendar/month'} onClick={() => handleOptionClick('Months')} 
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedOption === 'Months' ? 'bg-gray-100' : ''}`}>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4"><Check className={`${selectedOption === 'Months' ? '' : 'hidden'}`} size={16}/></div>
                <div>Months</div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarManager