'use client'
import { useState } from "react"

// Component Imports

export const Header = () => { 
  const [projectName, setProjectName] = useState('')

  return (
    <div>
      <div className="flex">
        <input 
        type='text'
        placeholder="Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)} 
        />
        <div className="border-2 border-red-500 bg-red-300 w-14 h-14 rounded-xl ml-5" />
      </div>
    </div>
  )
}

export default Header