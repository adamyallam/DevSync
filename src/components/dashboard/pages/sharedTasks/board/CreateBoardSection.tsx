'use client'
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"

//component imports
import BoardSection from "./BoardSection"

export const CreateBoardSection = () => {
  const [boardSections, setBoardSections] = useState<JSX.Element[]>([])
  const [isFirstSection, setIsFirstSection] = useState<boolean>(true);

  useEffect(() => {
      setIsFirstSection(boardSections.length === 0);
  }, [boardSections]);

  useEffect(() => {
    if (isFirstSection) {
      setBoardSections([newBoardSection()])
    }
  }, []);

  function newBoardSection() {
    return <BoardSection key={boardSections.length + 1} hasInitialTask={isFirstSection} isFirstSection={isFirstSection} />
  }

  function addBoardSection() {
    setBoardSections((prevSections) => {
     return [...prevSections, newBoardSection()]
    })
  }

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