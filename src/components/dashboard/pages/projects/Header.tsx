'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { ChevronDown, Ellipsis, PanelsTopLeft, ListOrdered, SquareKanban, Calendar, Share2, Check, CalendarX, CalendarClock, CalendarCheck, CalendarMinus2 } from "lucide-react"
import useProjectsDataContext from '@/utils/hooks/context/useProjectDataProvider'
import { usePathSegments } from '@/utils/hooks/usePathSegments'

// Component Imports
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"
import { HeaderSkeletonLoader } from '@/components/styledElements/LoadingElements'
import StatusButton from '@/components/styledElements/StatusButton'
import FavoritedButton from '@/components/styledElements/FavoritedButton'

export const Header = () => {
  const { id } = useParams()
  const { projects, loading, updateProjectName } = useProjectsDataContext()
  const projectView = usePathSegments(1)

  const project = projects?.find((project) => project.id.toString() === id);

  const [statusStyles, setStatusStyles] = useState({
    bgColor: 'bg-selected',
    icon: <div className="w-2 h-2 rounded-full bg-selected" />,
  }); 

  const handleStatusStyles = (styles: { bgColor: string; icon: JSX.Element }) => {
    setStatusStyles(styles);
  };

  if (loading) {
    return (
      <div className=''>
        <HeaderSkeletonLoader />
      </div>
    )
  }

  if (!project) {
    return <div className='mt-16 ml-8 text-2xl'>Project not found</div>;
  }

  const changeProjectName = async (newProjectName: string) => {
    if (!project) return;

    try {
      const res = await fetch(`http://localhost:3000/api/project`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: project.id,
          name: newProjectName,
        }),
      });

      if (res.ok) {
        console.log('Project name updated, new name:', newProjectName)
        updateProjectName(project.id, newProjectName)
      } else {
        console.error('Failed to update favorite status');
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  }

  return (
    <div className='mt-16 w-full'>
      <div className="flex">
        <div className='flex gap-1 w-full'>
          <div className={`flex items-center justify-center border-2 border-primary ${statusStyles.bgColor} w-8 h-8 rounded-md ml-8`}>{statusStyles.icon} </div>
          <AutoResizingInput textSize='text-lg' initialWidth={125} initialText={project.name} maxGrowthWidth={750} onConfirmChange={changeProjectName} />
          <button className='text-secondary-text mr-1'><ChevronDown strokeWidth={2} size={20} /></button>
          <FavoritedButton />
          <StatusButton status={project.status} onStatusChange={handleStatusStyles} />
        </div>


      </div>
      <div className="absolute flex gap-2 right-0 top-[76px] mr-8">
          <button className="flex">
            <div className="border rounded-full border-red-600 bg-red-400 w-8 h-8 translate-x-[6px]" />
            <div className="flex items-center justify-center border border-undertone rounded-full bg-primary w-8 h-8"><Ellipsis color="#6b6b6b" size={15} strokeWidth={3} /></div>
          </button>

          <button className="w-[80px] h-[35px] bg-secondary hover:bg-button-hover hover:scale-105 transition-transform outline-2 outline outline-primary rounded-sm text-white text-sm font-semibold"><div className='flex items-center justify-center gap-1'><Share2 size={12} strokeWidth={2.5} />Share</div></button>
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