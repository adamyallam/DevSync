'use client'
import { ChevronDown } from "lucide-react"
import useScreenWidth from "@/utils/hooks/useScreenWidth";

// Component Imports
import useNavbarUIContext from "@/utils/hooks/useNavbarUIContext";
import AddTaskButton from "@/components/styledElements/AddTaskButton";

export const ProjectTasksManager = () => { 
const { isSidebarOpen } = useNavbarUIContext();

  const screenWidth = useScreenWidth()

  return (
    <div>
      <AddTaskButton />

      <div className={`grid grid-cols-10 grid-rows-1 border-b-2 border-t-2 border-gray-300 gap-2 ml-8 h-10 transition-all duration-300`} style={{width: isSidebarOpen ? `${screenWidth - 304}px` : `${screenWidth - 64}px`}}>
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