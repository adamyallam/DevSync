'use client'
import { Plus, Ellipsis } from "lucide-react"

//component imports
import ProjectBoardTask from "./projects/board/ProjectBoardTask"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"

export const BoardTaskSection = () => {
  return (
    <div className="flex flex-col ml-8 mt-5 border rounded-lg border-gray-400 w-[270px] h-[calc(100%-40px)]">
      <div className="flex justify-between ml-2 mb-3 mt-2 mr-2">
        <AutoResizingInput maxGrowthWidth={185} placeholder="Untitled Section"/>

        <div className="flex gap-2">
          <button><Plus size={20} /></button>
          <button><Ellipsis size={20} /></button>
        </div>
      </div>

      <div className="self-center overflow-auto">
        <ProjectBoardTask />

      </div>
    </div>
  )
}

export default BoardTaskSection