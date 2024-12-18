'use client'
import { BadgeCheck, User, CalendarClock } from "lucide-react"

//component imports
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"

export const BoardTask = () => {
  
  return (
    <div className="pb-2">
      <div className="flex flex-col justify-evenly border border-undertone rounded-lg w-60 h-24">
        <div className="flex items-center gap-1 ml-2">
          <BadgeCheck size={18} color="green"/>
          <AutoResizingInput placeholder="Untitled Task"/>
        </div>

        <div className="flex gap-2 ml-2">
          <div className="flex justify-center items-center border border-dashed rounded-full border-secondary-text w-6 h-6 text-secondary-text">
            <User size={18} />
          </div>
          <div className="flex justify-center items-center border border-dashed rounded-full border-secondary-text w-6 h-6 text-secondary-text">
            <CalendarClock size={16}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardTask