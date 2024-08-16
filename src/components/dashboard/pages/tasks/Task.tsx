'use client'
import { Plus, BadgeCheck, CalendarClock, Lock, UserRoundSearch } from "lucide-react"
import { useContext, useState } from "react";

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';

interface Props {
  showTopBorder: boolean;
}

export const Task: React.FC<Props> = (props) => { 
  const isOpen = useContext(OpenContext);
  const [taskName, setTaskName] = useState('');
  const [projectSearch, setProjectSearch] = useState('')

  return (
    <div>
        <div className={`grid grid-cols-12 grid-rows-1 border-b-2 border-gray-300 ml-8 h-10 transition-all duration-300 ${props.showTopBorder ? 'border-t-2' : ''} ${isOpen ? 'mr-72' : 'mr-8'}`}>
          <div className={`flex col-span-4 ml-2 border-r-2 border-gray-300}`}>
            <button className="mr-1 ml-5"><BadgeCheck size={22} color="green"/></button>
            <input 
              type="text" 
              placeholder="Name"
              value={taskName} 
              onChange={(e) => setTaskName(e.target.value)} 
              className="text-sm w-full"
            />
          </div>

          <div className={`flex border-r-2 col-span-2`}>
            <button className="w-full pl-2"><CalendarClock size={22} /></button>
          </div>

          <div className={`flex items-center border-r-2 col-span-2`}>
            <input 
              type="text" 
              placeholder="Projects..."
              value={projectSearch} 
              onChange={(e) => setProjectSearch(e.target.value)} 
              className="text-sm w-full h-full pl-2"
            />
          </div>

          <div className={`flex items-center border-r-2 col-span-2`}>
            <Lock size={22} className="ml-2"/>
            <p className="ml-1 text-sm">Only Me</p>
          </div>

          <div className={`flex items-center justify-between col-span-2`}>
            <button className="w-full pl-2"><UserRoundSearch size={22}/></button>
            <button className="pr-2"><Plus size={18}/></button>
          </div>
        </div>
    </div>
  )
}

export default Task