'use client'
import { Plus, Ellipsis } from "lucide-react"
import { useState, useEffect } from "react"

//component imports
import ProjectBoardTask from "./projects/board/ProjectBoardTask"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"

interface Props {
  hasInitialTask: boolean;
}

export const BoardTaskSection: React.FC<Props> = ({hasInitialTask}) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [boardTasks, setBoardTasks] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (hasInitialTask) {
      setBoardTasks([newBoardTask()]);
      setInitialized(true);
    } else {
      setInitialized(true);
    }
  }, [hasInitialTask]);

  function newBoardTask() {
    return <ProjectBoardTask key={boardTasks.length + 1} />
  };

  function addBoardTask() {
    setBoardTasks((prevTasks) => {
      return [...prevTasks, newBoardTask()]
    })
  }

  if (!initialized) {
    return null
  }

  return (
    <div className="flex flex-col ml-8 mt-5 border rounded-lg border-gray-400 w-[270px] h-[calc(100%-40px)]">
      <div className="flex justify-between ml-2 mb-3 mt-2 mr-2">
        <AutoResizingInput maxGrowthWidth={200} placeholder="Untitled Section"/>

        <div className="flex gap-2">
          <button onClick={() => addBoardTask()}><Plus size={18} /></button>
          <button><Ellipsis size={18} /></button>
        </div>
      </div>

      <div className="self-center overflow-auto">
        {boardTasks}
      </div>
    </div>
  )
}

export default BoardTaskSection