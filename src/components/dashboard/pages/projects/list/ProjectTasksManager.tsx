'use client'
import { ChevronDown } from "lucide-react"

// Component Imports
import AddTaskHeaderButton from "@/components/styledElements/AddTaskHeaderButton";

export const ProjectTasksManager = () => { 

  return (
    <div className="w-full">
      <AddTaskHeaderButton />

      <div className={`grid grid-cols-10 grid-rows-1 border-b-2 border-t-2 border-gray-300 gap-2 ml-8 h-10 w-[95%] pr-[1px] transition-all duration-300`}>
        <div className={`flex justify-between col-span-4 ml-2 border-r-2 border-gray-300}`}>
          <button className="text-xs">Task name</button>
          <button className="mr-2"><ChevronDown size={16} className="mt-1"/></button>
        </div>

        <div className={`flex justify-between border-r-2 col-span-2`}>
          <button className="text-xs">Asignee</button>
          <button className="mr-2"><ChevronDown size={16} className="mt-1"/></button>
        </div>

        <div className={`flex justify-between items-center border-r-2 col-span-2`}>
          <p className="text-xs">Due date</p>
          <button className="mr-2"><ChevronDown size={16} className="mt-1"/></button>
        </div>

        <div className={`flex justify-between items-center col-span-2`}>
          <p className="text-xs">Priority</p>
          <button className="mr-2"><ChevronDown size={16} className="mt-1"/></button>
        </div>
      </div>
    </div>
  )
}

export default ProjectTasksManager