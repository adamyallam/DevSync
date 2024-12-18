'use client'
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"

//component imports
import BoardSection from "./BoardSection"
import BoardTask from "./BoardTask"

export const CreateBoardSection = () => {
  const [boardSections, setBoardSections] = useState<JSX.Element[]>([])

  function addBoardSection(isFirstSection: boolean = false) {
    setBoardSections((prevSections) => {
     return [...prevSections, <BoardSection key={boardSections.length} isFirstSection={isFirstSection}/>]
    })
  }

  if (boardSections.length === 0) { 
    addBoardSection(true)
  }

  return (
      <div className="flex w-full h-full whitespace-nowrap">
        <div className="flex ml-6">
          {boardSections}
        </div>
        
        <div className="pr-[250px]">
          <div onClick={() => addBoardSection()} className="ml-2 mt-5 h-[calc(100%-40px)] min-w-[270px] bg-selected rounded-lg hover:border border-undertone hover:cursor-pointer group">
            <button className="flex items-center justify-center gap-1 pt-3 w-full text-secondary-text text-sm font-semibold opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-transform">
              <Plus size={14} strokeWidth={3}/>
              Add Section
            </button>
          </div>
        </div>
      </div>
  )
}

export default CreateBoardSection