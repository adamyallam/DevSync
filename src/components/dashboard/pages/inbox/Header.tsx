'use client'
import { Filter, Ellipsis } from "lucide-react"

// Component Imports
import Transition from "../../Transition"


export const Header = () => { 
   

    return (
      <div>
        <Transition transition="translate-x-60">
          <div className="overflow-hidden">
            <div className="flex gap-4 ml-8 mt-1 text-sm">
              <button>Activity<div className="border-b-2 border-black mt-0.5 outline outline-2 outline-black" /></button>
              <button>Archive<div className="border-b-2 border-black mt-0.5 outline outline-2 outline-black" /></button>
            </div>

            <div className="border-b-2 -mt-0.5"/>
          </div>
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