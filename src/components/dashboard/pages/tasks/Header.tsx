'use client'
import { ChevronDown } from "lucide-react"

// Component Imports


export const Header = () => { 

    return (
      <div>
        <div className="flex items-center mb-2"> 
          <div className="w-12 h-12 ml-8 border-2 border-gray-600 bg-gray-200 rounded-full" />
          <div className="ml-4">
            <div className="flex items-center gap-1">
              <h1 className="text-xl">My Tasks</h1>
              <ChevronDown size={20} strokeWidth={2} className="mt-1"/>
            </div>
            <div className="flex gap-5">
              <button className="z-10">List<div className="bg-black w-full h-[2.5px] translate-y-[9.5px]"/></button>
              <button className="z-10">Calendar<div className="bg-black w-full h-[2.5px] translate-y-[9.5px]"/></button>
              <button className="z-10">Files<div className="bg-black w-full h-[2.5px] translate-y-[9.5px]"/></button>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 w-full h-[1.5px] z-0" />
      </div>
    )
}

export default Header