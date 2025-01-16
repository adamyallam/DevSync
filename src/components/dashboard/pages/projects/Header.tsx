'use client'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ChevronDown, Ellipsis, PanelsTopLeft, ListOrdered, SquareKanban, Calendar, Share2, CircleMinus, CirclePlus, SquarePen } from "lucide-react"
import useProjectsDataContext from '@/utils/hooks/context/useProjectDataProvider'
import { usePathSegments } from '@/utils/hooks/usePathSegments'
import { statusConfig } from '@/utils/statusConfig'
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"
import { HeaderSkeletonLoader } from '@/components/styledElements/LoadingElements'
import StatusButton from '@/components/styledElements/StatusButton'
import FavoritedButton from '@/components/styledElements/FavoritedButton'
import { useState, useRef, useEffect } from 'react'
import useNavbarUIContext from '@/utils/hooks/context/useNavbarUIContext'
import useMenuClose from '@/utils/hooks/useMenuClose'

export const Header = () => {
  const { projects, loading, updateProjectDatabase, removeProject } = useProjectsDataContext()
  const { toggleCreateProjectForm } = useNavbarUIContext()

  const [projectMenuOpen, setProjectMenuOpen] = useState(false)
  const [focusProjectName, setFocusProjectName] = useState(false)

  const projectMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const { id } = useParams()
  const router = useRouter()
  const projectView = usePathSegments(1)
  useMenuClose(projectMenuRef, menuButtonRef, projectMenuOpen, setProjectMenuOpen)

  const project = projects?.find((project) => project.id.toString() === id);

  if (loading) return <HeaderSkeletonLoader />
  if (!project) return <div className='mt-16 ml-8 text-2xl'>Project not found</div>;

  const deleteProject = async () => {

    try {
      const res = await fetch(`http://localhost:3000/api/project`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: project.id }),
      });

      if (!res.ok) { throw new Error('Failed to delete project') }

      router.push('/dashboard/home');
      await removeProject(project.id)
    } catch (err) {
      console.error(`Error deleting task ${id}`);
      throw err
    }
  }

  const statusStyles = statusConfig[project.status] || {
    bgColor: 'bg-gray-300',
    icon: <div className="w-4 h-4 rounded-full bg-red-500" />,
  };

  return (
    <div className='mt-16 w-full'>
      <div className='flex gap-1 w-full'>
        <div><div className={`flex items-center justify-center border-2 border-primary ${statusStyles.bgColor} w-8 h-8 rounded-md ml-8`}>{statusStyles.icon} </div></div>
        <AutoResizingInput setFocusInput={setFocusProjectName} focusInput={focusProjectName} textStyles='text-lg font-bold' initialWidth={125} initialText={project.name} maxGrowthWidth={750} onConfirmChange={(newName) => updateProjectDatabase(project, 'name', newName)} />
        <div className='relative flex flex-col justify-center items-center'>
          <button ref={menuButtonRef} onClick={() => { setProjectMenuOpen((prev) => !prev) }} className='text-secondary-text mr-1 hover:text-primary-text hover:scale-[1.15] transition-transform'><Ellipsis strokeWidth={2} size={20} /></button>
          {projectMenuOpen && (
            <div ref={projectMenuRef} className='absolute top-8 z-50 bg-primary border-undertone border-2 w-44 rounded-md'>
              <div className='w-full h-full flex flex-col border-b-2 border-undertone'>
                <button onClick={() => { setProjectMenuOpen(false), setFocusProjectName((prev) => !prev) }} className='flex items-center gap-1 w-full p-2 text-primary-text text-sm hover:bg-selected'><SquarePen size={15} strokeWidth={2} /> Change name</button>
                <button onClick={() => { setProjectMenuOpen(false), toggleCreateProjectForm(true) }} className='flex w-full h-full items-center gap-1 p-2 text-primary-text text-sm hover:bg-selected'><CirclePlus size={16} strokeWidth={2} /> Create project</button>
              </div>
              <button onClick={() => { setProjectMenuOpen(false), deleteProject() }} className='flex w-full h-full items-center gap-1 p-2 text-red-400 text-sm hover:bg-selected font-semibold'><CircleMinus size={16} strokeWidth={2} /> Delete Project</button>
            </div>
          )}
        </div>
        <FavoritedButton favorited={project.favorited} />
        <StatusButton project={project} model='project' status={project.status} />
      </div>
      <div>
        <div className="flex gap-10 mt-3 pl-10 text-sm font-semibold border-b border-undertone">
          {[
            { name: 'Overview', icon: PanelsTopLeft, route: 'overview' },
            { name: 'List', icon: ListOrdered, route: 'list' },
            { name: 'Board', icon: SquareKanban, route: 'board' },
            { name: 'Calendar', icon: Calendar, route: 'calendar' },
          ].map(({ name, icon: Icon, route }) => (
            <Link
              key={route}
              href={`/dashboard/projects/${id}/${route}`}
              className="z-10 group"
            >
              <div className='flex'>
                <span className={`invisible scale-105 font-bold flex items-center gap-1`}><Icon size={14} />{name}</span>
                <span className={`absolute ${projectView === route ? 'scale-110 font-bold' : 'group-hover:scale-110 transition-all'} flex items-center gap-0.5 text-primary-text`}><Icon size={14} />{name}</span>
              </div>
              <div className={`${projectView === route ? 'scale-x-100' : 'scale-x-0'} mt-2 bg-primary-text w-full h-[1.5px] translate-y-[1px] transition-transform duration-500`} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


export default Header