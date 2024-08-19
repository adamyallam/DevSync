'use client'
import { useState, useEffect, useRef} from "react"
import { ChevronDown, Star } from "lucide-react"

// Component Imports

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
      <div className="flex gap-2 mt-16">
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
      </div>

      <div>
        
      </div>
    </div>
  )
}

export default Header