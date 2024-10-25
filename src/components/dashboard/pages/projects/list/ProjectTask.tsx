'use client'
import { Plus, BadgeCheck, CalendarClock, ChevronDown, UserRoundSearch } from "lucide-react"
import { useState } from "react";

// Component Imports

export const ProjectTask = () => { 
  const [taskName, setTaskName] = useState('');

  return (
    <div className="w-full">
      <div className={`grid grid-cols-10 grid-rows-1 border-b-2 border-gray-300 gap-2 h-10 transition-all duration-300`}>
        <div className={`flex col-span-4 border-r-2`}>
          <button className="mr-1 ml-5"><BadgeCheck size={22} color="green"/></button>
          <input 
            type="text" 
            placeholder="Name"
            value={taskName} 
            onChange={(e) => setTaskName(e.target.value)} 
            className="text-sm w-full px-2"
          />
        </div>

        <div className={`flex items-center justify-between border-r-2 col-span-2`}>
          <button className="w-full pl-1"><UserRoundSearch size={22}/></button> 
          <button className="pr-2"><Plus size={18}/></button>
        </div>

        <div className={`flex border-r-2 col-span-2`}>
          <button className="w-full pl-1"><CalendarClock size={22} /></button>
        </div>

        <div className="self-center col-span-2">
          <button className="flex items-center gap-1"><div className="border rounded-full bg-red-500 w-3 h-3 ml-1 mr-1"/>High<ChevronDown size={13} className="mt-1"/></button>
        </div>
      </div>
    </div>
  )
}

export default ProjectTask