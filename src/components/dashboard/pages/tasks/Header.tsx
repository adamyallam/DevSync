'use client'
import { ChevronDown } from "lucide-react"
import Link from "next/link"

// Component Imports


export const Header = () => { 

    return (
      <div className="mt-16">
        <div className="flex items-center"> 
          <div className="border-b-2 border-gray-300 w-full">
            <div className="flex ml-8 items-center gap-1">
              <div className="w-8 h-8 border-2 border-[#3A4042] bg-gray-200 rounded-full mr-2" />
              <h1 className="text-xl">My Tasks</h1>
              <ChevronDown size={20} strokeWidth={2} className="mt-1"/>
            </div>

            <div className="flex ml-9 gap-4 mt-1">
              <Link href='/dashboard/tasks/list' className="z-10">List<div className="bg-black w-full h-[2.5px] translate-y-[1.5px]"/></Link>
              <Link href={'/dashboard/tasks/board'} className="z-10">Board<div className="bg-black w-full h-[2.5px] translate-y-[1.5px]"/></Link>
              <Link href={'/dashboard/tasks/calendar'} className="z-10">Calendar<div className="bg-black w-full h-[2.5px] translate-y-[1.5px]"/></Link>
              <Link href={'/dashboard/tasks/files'} className="z-10">Files<div className="bg-black w-full h-[2.5px] translate-y-[1.5px]"/></Link>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Header