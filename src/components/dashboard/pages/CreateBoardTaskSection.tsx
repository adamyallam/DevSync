'use client'
import { Plus } from "lucide-react"
import { useState } from "react"

//component imports
import BoardTaskSection from "./BoardTaskSection"

export const CreateBoardSection = () => {
  const [boardSections, setBoardSections] = useState<JSX.Element[]>([])

  function addSection() {
    const newBoardSection = (() => {
      return <BoardTaskSection key={boardSections.length + 1} hasInitialTask={false}/>
    })();

    setBoardSections((prevSections) => {
      return [...prevSections, newBoardSection]
    })
  }

  return (
      <div className="flex h-full">
        <BoardTaskSection hasInitialTask={true} />

        {boardSections}
        
        <button onClick={() => addSection()} className="self-start font-semibold opacity-60 hover:opacity-100 mt-8">
        <div className="flex items-center gap-1">
          <Plus size={18}/>
          Add Section
        </div>
        </button>
      </div>
  )
}

export default CreateBoardSection