'use client'
import { Plus, Ellipsis } from "lucide-react"
import { useState, useEffect } from "react"

//component imports
import BoardTask from "./BoardTask"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"

interface Props {
  hasInitialTask: boolean;
  isFirstSection: Boolean;
}

export const BoardSection: React.FC<Props> = ({hasInitialTask, isFirstSection}) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [boardTasks, setBoardTasks] = useState<JSX.Element[]>([]);

  function addBoardTask() {
    const newTask = <BoardTask key={boardTasks.length + 1} />
    setBoardTasks((prevTasks) => {
      return [...prevTasks, newTask]
    })
  }

  useEffect(() => {
    if (hasInitialTask) {
      addBoardTask()
    }

    setInitialized(true);
  }, [hasInitialTask]);

  if (!initialized) {
    return null
  }

  return (
    <div className={`flex flex-col mt-5 border rounded-lg border-gray-400 min-w-[270px] h-[calc(100%-40px)] ${isFirstSection ? 'ml-8' : 'ml-2'}`}>
      <div className="flex justify-between ml-3 mb-3 mt-2 mr-3">
        <AutoResizingInput maxGrowthWidth={200} placeholder="Untitled Section"/>

        <div className="flex gap-2">
          <button onClick={() => addBoardTask()}><Plus size={18} /></button>
          <button><Ellipsis size={18} /></button>
        </div>
      </div>

      <div className="flex flex-col items-center w-full self-center overflow-auto">
        {boardTasks}
        <button onClick={() =>addBoardTask()} className="flex items-center gap-1 pb-2 font-semibold opacity-60 hover:opacity-100">
            <Plus size={18}/>
            Add Task
        </button>
      </div>
    </div>
  )
}

export default BoardSection