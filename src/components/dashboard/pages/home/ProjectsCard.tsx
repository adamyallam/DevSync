'use client'
import { ChevronDown, Plus } from "lucide-react"
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider"

// Component Imports
import ProjectBoxLink from "@/components/styledElements/ProjectBoxLink"
import { BouncingDots } from "@/components/styledElements/LoadingElements"

export const ProjectsCard = () => {

  const { projects } = useProjectsDataContext()

  return (
    <div className="w-550 h-96 border-2 border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center mt-6 ml-10">
        <h1 className="text-2xl">Projects</h1>
        <p className="text-xs mt-1 ml-2">Recents</p>
        <ChevronDown size={14} strokeWidth={2} className="mt-2" />
      </div>

      <div className="grid grid-cols-2 grid-rows-5 ml-10 mt-6 gap-6">
        {projects?.length ? (
          <>
            <div className="flex items-center">
              <div className="flex items-center justify-center border-2 border-dotted border-gray-400 w-10 h-10 rounded-xl">
                <Plus size={24} />
              </div>
              <p className="ml-3">Create project</p>
            </div>

            {projects.map((project) => (
              <ProjectBoxLink key={project.id} projectID={project.id} name={project.name} />
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center col-span-2 row-span-10">
            <BouncingDots color="#374151" size={15} />
          </div>
        )}

      </div>
    </div>
  )
}


export default ProjectsCard