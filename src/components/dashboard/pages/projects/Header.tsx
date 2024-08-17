'use client'
import { useState } from "react"
import { ChevronDown, Star } from "lucide-react"

// Component Imports

export const Header = () => { 
  const [projectName, setProjectName] = useState('')

  return (
    <div>
      <div className="flex gap-2 mt-16">
        <div className="border-2 border-red-500 bg-red-300 w-8 h-8 rounded-xl ml-8" />
        <input 
        type='text'
        placeholder="Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="text-lg w-36" 
        />
        <button><ChevronDown strokeWidth={2} size={20}/></button>
        <button><Star strokeWidth={1} size={20}/></button>
      </div>
    </div>
  )
}

export default Header