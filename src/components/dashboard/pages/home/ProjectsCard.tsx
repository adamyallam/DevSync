'use client'
import { ChevronDown, Plus } from "lucide-react"
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider"
import ProjectBoxLink from "@/components/styledElements/ProjectBoxLink"
import { BouncingDots } from "@/components/styledElements/LoadingElements"
import { StatusKey } from "@/utils/statusConfig"
import useNavbarUIContext from "@/utils/hooks/context/useNavbarUIContext"
import { useState, useRef } from "react"
import useMenuClose from "@/utils/hooks/useMenuClose"

export const ProjectsCard = () => {
  const { projects, loading } = useProjectsDataContext()
  const { isCreateProjectFormOpen, toggleCreateProjectForm } = useNavbarUIContext();

  const projectsViewMenu = useRef<HTMLDivElement>(null)
  const projectsViewButton = useRef<HTMLButtonElement>(null)

  const [projectsView, setProjectsView] = useState('All Projects')
  const [openProjectsView, setOpenProjectsView] = useState(false)

  useMenuClose(projectsViewMenu, projectsViewButton, openProjectsView, setOpenProjectsView)

  const filteredProjects = projects?.filter((project) => {
    if (projectsView === 'Favorited') {
      return project.favorited
    }
    if (projectsView === 'Unfavorited') {
      return !project.favorited
    }
    return true
  })

  return (
    <div className="w-550 h-96 border-2 border-undertone rounded-lg shadow-sm overflow-auto">
      <div className="flex items-center mt-6 ml-8">
        <h1 className="text-2xl text-primary-text font-semibold">Projects</h1>
        <div className="relative">
          <button ref={projectsViewButton} onClick={() => setOpenProjectsView((prev) => !prev)} className="flex items-center gap-0.5 text-xs ml-2 text-secondary-text hover:font-semibold hover:scale-105 transition-transform">{projectsView}<ChevronDown size={14} strokeWidth={3} /></button>
          {openProjectsView && (
            <div ref={projectsViewMenu} className="absolute flex flex-col items-center w-32 bg-primary border-2 border-undertone rounded-md shadow-md z-50">
              <button onClick={() => { setProjectsView('All Projects'), setOpenProjectsView(false) }} className={`text-primary-text hover:bg-selected w-full  ${projectsView === 'All Projects' ? 'hidden' : ''}`}>All Projects</button>
              <button onClick={() => { setProjectsView('Favorited'), setOpenProjectsView(false) }} className={`text-primary-text hover:bg-selected w-full ${projectsView === 'Favorited' ? 'hidden' : ''}`}>Favorited</button>
              <button onClick={() => { setProjectsView('Unfavorited'), setOpenProjectsView(false) }} className={`text-primary-text hover:bg-selected w-full  ${projectsView === 'Unfavorited' ? 'hidden' : ''}`}>Unfavorited</button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-6 ml-8 w-[90%] mt-8 pb-5">
        {loading ? (
          <div className="flex justify-center items-center col-span-2 row-span-10">
            <BouncingDots color="#DBDADA" size={15} />
          </div>
        ) : !projects?.length ? (
          <button onClick={() => toggleCreateProjectForm(!isCreateProjectFormOpen)} className="flex items-center hover:bg-highlighted p-2 rounded-md">
            <div className="flex items-center justify-center border-2 border-dotted border-secondary-text w-10 h-10 rounded-lg text-secondary-text">
              <Plus size={20} strokeWidth={3} />
            </div>
            <span className="ml-3 text-secondary-text text-sm font-semibold">Create project</span>
          </button>
        ) : (
          <>
            <button onClick={() => toggleCreateProjectForm(!isCreateProjectFormOpen)} className="flex items-center hover:bg-highlighted p-2 rounded-md">
              <div className="flex items-center justify-center border-2 border-dotted border-secondary-text w-10 h-10 rounded-lg text-secondary-text">
                <Plus size={20} strokeWidth={3} />
              </div>
              <span className="ml-3 text-secondary-text text-sm font-semibold">Create project</span>
            </button>

            {filteredProjects?.map((project) => (
              <ProjectBoxLink key={String(project.id)} projectID={project.id} name={project.name} status={project.status ? project.status : "SetStatus" as StatusKey} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}


export default ProjectsCard