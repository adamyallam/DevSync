'use client'
import { ChevronDown, Plus } from "lucide-react"
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider"

// Component Imports
import ProjectBoxLink from "@/components/styledElements/ProjectBoxLink"
import { BouncingDots } from "@/components/styledElements/LoadingElements"

export const ProjectsCard = () => {

  const { projects } = useProjectsDataContext()

  return (
    <div className="w-550 h-96 border-2 border-undertone rounded-lg shadow-sm overflow-auto">
      <div className="flex items-center mt-6 ml-8">
        <h1 className="text-2xl text-primary-text">Projects</h1>
        <button className="flex items-center gap-0.5 text-xs ml-2 text-secondary-text hover:font-semibold hover:scale-105 transition-transform">Recents<ChevronDown size={14} strokeWidth={3}  className="mt-1"/></button>
      </div>

      <div className="grid grid-cols-2 gap-y-6 ml-8 w-[90%] h-[40%] mt-8 pb-5">
        {projects?.length ? (
          <>
            <button className="flex items-center hover:bg-highlighted p-2 rounded-md">
              <div className="flex items-center justify-center border-2 border-dotted border-secondary-text w-10 h-10 rounded-lg text-secondary-text">
                <Plus size={20} strokeWidth={3} />
              </div>
              <span className="ml-3 text-secondary-text text-sm font-semibold">Create project</span>
            </button>

            {projects.map((project) => (
              <ProjectBoxLink key={project.id} projectID={project.id} name={project.name} status={project.status}/>
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center col-span-2 row-span-10">
            <BouncingDots color="#DBDADA" size={15} />
          </div>
        )}

      </div>
    </div>
  )
}


export default ProjectsCard