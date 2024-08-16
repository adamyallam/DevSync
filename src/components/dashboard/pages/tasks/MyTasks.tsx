'use client'
import { Plus, ChevronDown } from "lucide-react"

// Component Imports

export const MyTasks = () => { 

  return (
    <div>
      <div className="flex gap-2 ml-8 mt-4 mb-4">
        <button><ChevronDown size={16} className=""/></button>
        <h1>My Tasks</h1>
        <button className=""><Plus size={16}/></button>
      </div>

      
    </div>
  )
}

export default MyTasks