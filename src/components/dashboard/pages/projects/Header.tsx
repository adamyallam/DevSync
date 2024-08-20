'use client'
import { useState, useEffect, useRef} from "react"
import { ChevronDown, Star, Ellipsis, PanelsTopLeft, ListOrdered, SquareKanban, Calendar, Upload } from "lucide-react"

// Component Imports
import Transition from "../../Transition"

export const Header = () => { 
  const [projectName, setProjectName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inputRef.current && spanRef.current && spanRef.current.offsetWidth >= 125) {
      inputRef.current.style.width = `${spanRef.current.offsetWidth + 2}px`;
    } else if (inputRef.current) {
      inputRef.current.style.width = '125px'
    }
  }, [projectName]);

  return (
    <div>
      <div className="flex">
        <Transition classes='flex gap-2 mt-16 w-full' transition="translate-x-60">
          <div className="border-2 border-red-500 bg-red-300 w-8 h-8 rounded-xl ml-8" />
          <input 
          type='text'
          placeholder="Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          ref={inputRef}
          className={`border border-gray-300 rounded px-2 py-1`}
          style={{ width: '125px'}}
          />

          <span
            ref={spanRef}
            className="absolute top-0 left-0 invisible whitespace-pre pr-5"
          >
            {projectName}
          </span>

          <button><ChevronDown strokeWidth={2} size={20}/></button>
          <button><Star strokeWidth={1} size={20}/></button>
          <button className="flex items-center gap-1 ml-3"><div className="border rounded-full border-black w-3 h-3"/>Set Status<ChevronDown strokeWidth={2} size={20}/></button>
        </Transition>

        <div className="flex gap-2 items-center justify-end mt-16 mr-8">
          <button className="flex">
            <div className="border rounded-full border-red-600 bg-red-400 w-7 h-7 translate-x-1.5 outline outline-2 outline-white"/>
            <div className="flex items-center justify-center border rounded-full border-gray-300 bg-gray-100 w-7 h-7"><Ellipsis color="#6b6b6b" size={17} strokeWidth={3} /></div>
          </button>

          <button className="border border-gray-300 w-14 h-8 bg-blue-500 rounded-md text-white text-sm">Share</button>
        </div>
      </div>

      <Transition transition="translate-x-60">
        <div className="flex gap-4 ml-10 mt-2">
          <button className="z-10"><div className="flex items-center gap-1"><PanelsTopLeft size={14}/>Overview</div> <div className="bg-black w-full h-[2.5px]"/></button>
          <button className="z-10"><div className="flex items-center gap-1"><ListOrdered size={16}/>List</div> <div className="bg-black w-full h-[2.5px]"/></button>
          <button className="z-10"><div className="flex items-center gap-1"><SquareKanban size={14}/>Board</div> <div className="bg-black w-full h-[2.5px]"/></button>
          <button className="z-10"><div className="flex items-center gap-1"><Calendar size={14}/>Calendar</div> <div className="bg-black w-full h-[2.5px]"/></button>
          <button className="z-10"><div className="flex items-center gap-1"><Upload size={14}/>Files</div> <div className="bg-black w-full h-[2.5px]"/></button>
        </div>

        <div className="bg-gray-300 w-full h-[1.5px] -translate-y-[1.5px] z-0" />
      </Transition>

    </div>
  )
}

export default Header