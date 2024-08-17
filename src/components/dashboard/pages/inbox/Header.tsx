'use client'
import { Filter, Ellipsis } from "lucide-react"

// Component Imports
import Transition from "../../Transition"


export const Header = () => { 
   

    return (
      <div>
        <Transition transition="translate-x-60">
          <div className="flex gap-4 mt-2 ml-8">
            <button className="border-b-2 border-black">Activity</button>
            <button className="border-b-2 border-black">Archive</button>
          </div>
        </Transition>
        <div className="flex justify-between border-b-2 border-t-2 p-4">
          <Transition transition="translate-x-60">
            <button className="flex items-center gap-1 text-sm ml-7"><Filter size={20} strokeWidth={1}/> Filter</button>
          </Transition>
          <button className="mr-8"><Ellipsis /></button>
        </div>
      </div>
    )
}

export default Header