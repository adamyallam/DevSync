'use client'
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"

//component imports
import BoardSection from "./BoardSection"

export const CreateBoardSection = () => {
  const [boardSections, setBoardSections] = useState<JSX.Element[]>([])
  const [isFirstSection, setIsFirstSection] = useState<boolean>(true);

  function addBoardSection() {
    const newBoardSection = <BoardSection key={boardSections.length + 1} hasInitialTask={isFirstSection} isFirstSection={isFirstSection} />
    setBoardSections((prevSections) => {
     return [...prevSections, newBoardSection]
    })
  }

  useEffect(() => {
    if (isFirstSection) {
      addBoardSection()
    }
  }, []);

  useEffect(() => {
      setIsFirstSection(boardSections.length === 0);
  }, [boardSections]);

  return (
      <div className="flex h-full">
        {boardSections}
        
        <button onClick={() => addBoardSection()} className="self-start font-semibold opacity-60 hover:opacity-100 mt-8 ml-5">
        <div className="flex items-center gap-1">
          <Plus size={18}/>
          Add Section
        </div>
        </button>
      </div>
  )
}

export default CreateBoardSection