'use client'
import { Plus } from "lucide-react"

// Component Imports
import Transition from "../../Transition"

export const TaskManagement = () => { 

    return (
      <div className="ml-8 mt-4">
        <Transition transition="translate-x-60">
          <button className="flex items-center gap-1 border-2 bg-blue-500 w-w-22 h-9 rounded-md p-1 text-sm text-white"><Plus size={16}/>Add task</button>
        </Transition>
        <div className="flex">
          <button>Filter</button>
          <button>Sort</button>
        </div>
      </div>
    )
}

export default TaskManagement