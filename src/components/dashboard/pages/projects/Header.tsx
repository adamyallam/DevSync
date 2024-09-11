'use client'
import Link from 'next/link'
import { ChevronDown, Star, Ellipsis, PanelsTopLeft, ListOrdered, SquareKanban, Calendar, Upload } from "lucide-react"

// Component Imports
import Transition from "../../Transition"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"

export const Header = () => { 

  return (
    <div className='mt-16'>
      <div className="flex">
        <Transition classes='flex gap-2 w-full' transition="translate-x-60">
          <div className="border-2 border-red-500 bg-red-300 w-8 h-8 rounded-xl ml-8" />
          <AutoResizingInput className="border border-gray-300 rounded px-2 py-1" initialWidth={125} initialState="Project Name" />
          <button><ChevronDown strokeWidth={2} size={20}/></button>
          <button><Star strokeWidth={1} size={20}/></button>
          <button className="flex items-center gap-1 ml-3 mt-1 text-sm border rounded-full h-6 p-1 px-2"><div className="border rounded-full border-black w-2 h-2"/>Set Status<ChevronDown strokeWidth={2} size={16}/></button>
        </Transition>

        <div className="flex gap-2 items-center justify-end mr-8">
          <button className="flex">
            <div className="border rounded-full border-red-600 bg-red-400 w-6 h-6 translate-x-[6px] outline outline-2 outline-white"/>
            <div className="flex items-center justify-center border rounded-full border-gray-300 bg-gray-100 w-6 h-6"><Ellipsis color="#6b6b6b" size={15} strokeWidth={3} /></div>
          </button>

          <button className="border border-gray-300 w-14 h-7 bg-blue-500 rounded-md text-white text-sm">Share</button>
        </div>
      </div>

      <Transition transition="translate-x-60">
        <div className="flex gap-4 mt-2 ml-10 text-sm border-b-2 border-gray-300">
          <Link href={'/dashboard/projects/overview'} className="z-10"><div className="flex items-center gap-1"><PanelsTopLeft size={14}/>Overview</div> <div className="bg-black w-full h-[2.5px] translate-y-[1.5px]"/></Link>
          <Link href={'/dashboard/projects/list'} className="z-10"><div className="flex items-center gap-1"><ListOrdered size={16}/>List</div> <div className="bg-black w-full h-[2.5px] translate-y-[1.5px]"/></Link>
          <Link href={'/dashboard/projects/board'} className="z-10"><div className="flex items-center gap-1"><SquareKanban size={14}/>Board</div> <div className="bg-black w-full h-[2.5px] translate-y-[1.5px]"/></Link>
          <Link href={'/dashboard/projects/calendar'} className="z-10"><div className="flex items-center gap-1"><Calendar size={14}/>Calendar</div> <div className="bg-black w-full h-[2.5px] translate-y-[1.5px]"/></Link>
          <Link href={'/dashboard/projects/files'} className="z-10"><div className="flex items-center gap-1"><Upload size={14}/>Files</div> <div className="bg-black w-full h-[2.5px] translate-y-[1.5px]"/></Link>
        </div>
      </Transition>

    </div>
  )
}

export default Header