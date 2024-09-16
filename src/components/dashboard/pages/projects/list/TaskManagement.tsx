'use client'
import { Plus, Filter, ArrowUpDown, ChevronDown } from "lucide-react"
import useScreenWidth from "@/utils/hooks/useScreenWidth";

// Component Imports
import useNavbarUIContext from "@/utils/hooks/useNavbarUIContext";

export const TaskManagement = () => { 
const { isSidebarOpen } = useNavbarUIContext();

  const screenWidth = useScreenWidth()

  return (
    <div className="ml-8">
      <div className="grid grid-cols-2">
        <div className="mt-4">
          <button className="flex items-center gap-1 border-2 bg-blue-500 w-w-22 h-9 rounded-md p-1 text-sm text-white"><Plus size={16}/>Add task</button>
        </div>

        <div className="flex justify-end gap-5 mt-4 mr-10">
          <button className="flex items-center gap-1"><Filter size={16}/>Filter</button>
          <button className="flex items-center gap-1"><ArrowUpDown size={16}/>Sort</button>
        </div>
      </div>

      <div className={`grid grid-cols-10 grid-rows-1 border-b-2 border-t-2 border-gray-300 gap-2 mt-4 h-10 transition-all duration-300`} style={{width: isSidebarOpen ? `${screenWidth - 304}px` : `${screenWidth - 64}px`}}>
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

export default TaskManagement