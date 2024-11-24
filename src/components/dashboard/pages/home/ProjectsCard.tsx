'use client'
import { ChevronDown, Plus } from "lucide-react"


// Component Imports

export const ProjectsCard = () => {

  return (
    <div className="w-550 h-96 border-2 border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center mt-6 ml-10">
        <h1 className="text-2xl">Projects</h1>
        <p className="text-xs mt-1 ml-2">Recents</p>
        <ChevronDown size={14} strokeWidth={2} className="mt-2" />
      </div>

      <div className="grid grid-cols-2 grid-rows-4 ml-10 mt-6 gap-3">
        <div className="flex items-center">
          <div className="flex items-center justify-center border-2 border-dotted border-gray-400 w-14 h-14 rounded-xl">
            <Plus size={24} />
          </div>
          <p className="ml-3">Create project</p>
        </div>

        <div className="flex items-center">
          <div className="border-2 border-red-500 bg-red-300 w-14 h-14 rounded-xl ml-5" />
          <p className="ml-3">Project</p>
        </div>

        <div className="flex items-center">
          <div className="border-2 border-blue-500 bg-blue-300 w-14 h-14 rounded-xl" />
          <p className="ml-3">Project</p>
        </div>

        <div className="flex items-center">
          <div className="border-2 border-green-500 bg-green-300 w-14 h-14 rounded-xl ml-5" />
          <p className="ml-3">Project</p>
        </div>
      </div>
    </div>
  )
}


export default ProjectsCard