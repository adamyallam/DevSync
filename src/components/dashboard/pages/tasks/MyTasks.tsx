'use client'
import { Plus, Filter, ArrowUpDown, ChevronDown } from "lucide-react"
import { useContext } from "react";

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';
import Transition from "../../Transition"

export const MyTasks = () => { 
  const isOpen = useContext(OpenContext);
  

  return (
    <div>
      <div className="flex gap-2 ml-8 mt-4">
        <button><ChevronDown size={16} className=""/></button>
        <h1>My Tasks</h1>
        <button className=""><Plus size={16}/></button>
      </div>

      
    </div>
  )
}

export default MyTasks