'use client'
import { Plus, Filter, ArrowUpDown, ChevronDown, BadgeCheck, CalendarClock } from "lucide-react"
import { useContext, useState } from "react";

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';
import Transition from "../../Transition"

export const Task = () => { 
  const isOpen = useContext(OpenContext);
  const [taskName, setTaskName] = useState('');

  return (
    <div>
      <Transition transition="translate-x-60">
        <div className={`grid grid-cols-12 grid-rows-1 border-b-2 border-t-2 border-gray-300 gap-2 ml-8 mt-4 h-10 transition-all duration-300 ${isOpen ? 'mr-72' : 'mr-8'}`}>
          <div className={`flex col-span-4 ml-2 border-r-2 border-gray-300}`}>
            <button className="mr-1"><BadgeCheck size={16} color="green"/></button>
            <input 
              type="text" 
              placeholder="Name"
              value={taskName} 
              onChange={(e) => setTaskName(e.target.value)} 
              className="text-xs w-full"
            />
          </div>

          <div className={`flex border-r-2 col-span-2`}>
            <button><CalendarClock size={22} /></button>
          </div>

          <div className={`flex items-center border-r-2 col-span-2`}>

          </div>

          <div className={`flex items-center border-r-2 col-span-2`}>

          </div>

          <div className={`flex items-center col-span-2`}>

          </div>
        </div>
      </Transition>
    </div>
  )
}

export default Task