'use client'
import Link from "next/link"
import { Filter, Ellipsis } from "lucide-react"

// Component Imports



export const Header = () => { 
   

    return (
      <div>
          <div className="mt-16">
            <h1 className="text-2xl ml-8">Inbox</h1>
            <div className="flex gap-4 ml-8 mt-1 mb-1 text-sm">
              <Link href={'/dashboard/inbox/activity'} className="z-10">Activity<div className="bg-black w-full h-[2.5px] translate-y-1"/></Link>
              <Link href={'/dashboard/inbox/archive'} className="z-10">Archive<div className="bg-black w-full h-[2.5px] translate-y-1"/></Link>
            </div>
          </div>

          <div className="bg-gray-200 w-full h-[1.5px] z-0 -translate-y-[1.5px]" />

        <div className="flex justify-between border-b-2 p-4">
          <div>
            <button className="flex items-center gap-1 text-sm ml-7"><Filter size={20} strokeWidth={1}/>Filter</button>
          </div>
          <button className="mr-8"><Ellipsis /></button>
        </div>
      </div>
    )
}

export default Header