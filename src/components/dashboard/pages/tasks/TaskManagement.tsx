'use client'
import { Plus, Filter, ArrowUpDown, ChevronDown } from "lucide-react"
import { useContext } from "react";

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';
import Transition from "../../Transition"

export const TaskManagement = () => { 
  const isOpen = useContext(OpenContext);

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="ml-8 mt-4">
          <Transition transition="translate-x-60">
            <button className="flex items-center gap-1 border-2 bg-blue-500 w-w-22 h-9 rounded-md p-1 text-sm text-white"><Plus size={16}/>Add task</button>
          </Transition>
        </div>

        <div className="flex justify-end gap-5 mt-4 mr-10">
          <button className="flex items-center gap-1"><Filter size={16}/>Filter</button>
          <button className="flex items-center gap-1"><ArrowUpDown size={16}/>Sort</button>
        </div>
      </div>

      <Transition transition="translate-x-60">
        <div className="grid grid-cols-12 grid-rows-1 gap-2 border-b-2 border-t-2 border-gray-300 ml-8 mt-4 mr-8 h-10">
          <div className={`flex ml-2 border-r-2 ${isOpen ? 'col-span-3' : 'col-span-4'}`}>
            <button className="text-xs">Task name</button>
            <button><ChevronDown size={16} className="mt-1"/></button>
          </div>

          <div className="flex col-span-2 border-r-2">
            <button className="text-xs">Due date</button>
            <button><ChevronDown size={16} className="mt-1"/></button>
          </div>

          <div className="flex items-center col-span-2 border-r-2">
            <p className="text-xs">Projects</p>
            <button><ChevronDown size={16} className="mt-1"/></button>
          </div>

          <div className="flex items-center col-span-2 border-r-2">
            <p className="text-xs">Task visibility</p>
            <button><ChevronDown size={16} className="mt-1"/></button>
          </div>

          <div className="flex items-center col-span-2">
            <p className="text-xs">Collaborators</p>
            <button><ChevronDown size={16} className="mt-1"/></button>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default TaskManagement