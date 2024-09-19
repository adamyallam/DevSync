'use client'
import { BadgeCheck, User, CalendarClock } from "lucide-react"

//component imports
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"

export const ProjectBoardTask = () => {
  
  return (
    <div className="pb-2">
      <div className="flex flex-col justify-evenly border border-gray-200 bg-white rounded-lg w-60 h-24">
        <div className="flex items-center gap-1 ml-2">
          <BadgeCheck size={18} color="green"/>
          <AutoResizingInput placeholder="Untitled Task" className="text-md"/>
        </div>

        <div className="flex gap-2 ml-2">
          <div className="flex justify-center items-center border border-dashed rounded-full border-gray-500 w-6 h-6">
            <User color="gray" size={18} />
          </div>
          <div className="flex justify-center items-center border border-dashed rounded-full border-gray-500 w-6 h-6">
            <CalendarClock color="gray" size={16}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectBoardTask