'use client'
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"

//component imports
import BoardSection from "./BoardSection"

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
        
        <div className="pr-12">
          <div className="ml-2 mt-5 h-[calc(100%-40px)] min-w-[270px] bg-gray-100 rounded-lg">
            <button onClick={() => addBoardSection()} className="flex items-center justify-center gap-1 pt-3 w-full font-semibold opacity-60 hover:opacity-100">
              <Plus size={18}/>
              Add Section
            </button>
          </div>
        </div>
      </div>
  )
}

export default CreateBoardSection