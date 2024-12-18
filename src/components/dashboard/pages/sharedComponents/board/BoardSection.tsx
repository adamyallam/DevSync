'use client'
import { Plus, Ellipsis } from "lucide-react"
import { useState, useEffect } from "react"

//component imports
import BoardTask from "./BoardTask"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"

interface Props {
  isFirstSection: boolean;
}

export const BoardSection: React.FC<Props> = ({isFirstSection = false}) => {
  const [boardTasks, setBoardTasks] = useState<JSX.Element[]>([]);

  function addBoardTask() {
    setBoardTasks((prevTasks) => {
      return [...prevTasks, <BoardTask key={boardTasks.length} />]
    })
  }

  if (boardTasks.length === 0 && isFirstSection) {
    addBoardTask()
  }

  return (
    <div className={`flex flex-col mt-5 ml-2 border rounded-lg border-undertone min-w-[270px] h-[calc(100%-40px)]`}>
      <div className="flex justify-between ml-3 mb-3 mt-2 mr-3">
        <AutoResizingInput maxGrowthWidth={200} placeholder="Untitled Section"/>

        <div className="flex gap-2">
          <button className="text-primary-text" onClick={() => addBoardTask()}><Plus size={16} strokeWidth={2} /></button>
          <button className="text-primary-text"><Ellipsis size={18} /></button>
        </div>
      </div>

      <div className="flex flex-col items-center h-full overflow-auto">
        {boardTasks}
        <button onClick={() =>addBoardTask()} className="flex items-center pb-2 text-secondary-text font-semibold opacity-70 hover:opacity-100 hover:scale-110 text-sm transition-transform">
            <Plus size={14} strokeWidth={3}/>
            Add Task
        </button>
      </div>
    </div>
  )
}

export default BoardSection