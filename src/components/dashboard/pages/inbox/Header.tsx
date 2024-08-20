'use client'
import { Filter, Ellipsis } from "lucide-react"

// Component Imports
import Transition from "../../Transition"


export const Header = () => { 
   

    return (
      <div>
        <Transition transition="translate-x-60">
          <div className="flex gap-4 ml-8 mt-1 text-sm">
            <button className="z-10">Activity<div className="bg-black w-full h-[2.5px]"/></button>
            <button className="z-10">Archive<div className="bg-black w-full h-[2.5px]"/></button>
          </div>

          <div className="bg-gray-200 w-full h-[1.5px] z-0 -translate-y-[1.5px]" />
        </Transition>

        <div className="flex justify-between border-b-2 p-4">
          <Transition transition="translate-x-60">
            <button className="flex items-center gap-1 text-sm ml-7"><Filter size={20} strokeWidth={1}/>Filter</button>
          </Transition>
          <button className="mr-8"><Ellipsis /></button>
        </div>
      </div>
    )
}

export default Header