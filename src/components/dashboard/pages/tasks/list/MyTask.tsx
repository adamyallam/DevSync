'use client'
import { Plus, BadgeCheck, CalendarClock, Lock, UserRoundSearch } from "lucide-react"
import { useState } from "react";
import useScreenWidth from "@/utils/hooks/useScreenWidth";
import useNavbarUIContext from "@/utils/hooks/useNavbarUIContext";

// Component Imports


interface Props {
  showTopBorder: boolean;
  showAddTask: boolean;
}

export const MyTask: React.FC<Props> = (props) => { 
  const { isSidebarOpen } = useNavbarUIContext();

  const [taskName, setTaskName] = useState('');
  const [projectSearch, setProjectSearch] = useState('')
  const screenWidth = useScreenWidth()

  return (
    <div>
      <div className={`grid grid-cols-12 grid-rows-1 border-b-2 border-gray-300 ml-8 h-10 transition-all duration-300 ${props.showTopBorder ? 'border-t-2' : ''}`} 
      style={{width: isSidebarOpen ? `${screenWidth - 304}px` : `${screenWidth - 64}px`}}>
        <div className={`flex col-span-4 ml-2 border-r-2`}>
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

      <div className={props.showAddTask ? '' : 'hidden'}>
        <button className="ml-20 mt-2 text-sm">Add task...</button>
      </div>
    </div>
  )
}

export default MyTask