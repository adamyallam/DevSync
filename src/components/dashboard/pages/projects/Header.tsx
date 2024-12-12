'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { ChevronDown, Star, Ellipsis, PanelsTopLeft, ListOrdered, SquareKanban, Calendar, Upload } from "lucide-react"
import useProjectsDataContext from '@/utils/hooks/context/useProjectDataProvider'
import { usePathSegments } from '@/utils/hooks/usePathSegments'

// Component Imports
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"
import { HeaderSkeletonLoader } from '@/components/styledElements/LoadingElements'
import StatusButton from '@/components/styledElements/StatusButton'
import FavoritedButton from '@/components/styledElements/FavoritedButton'

export const Header = () => {
  const { id } = useParams()
  const { projects, loading } = useProjectsDataContext()
  const projectView = usePathSegments(1)

  const project = projects?.find((project) => project.id.toString() === id);

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
        <div className='flex gap-2 w-full'>
          <div className="border-2 border-red-500 bg-red-300 w-8 h-8 rounded-xl ml-8" />
          <AutoResizingInput initialWidth={125} initialText={project.name} maxGrowthWidth={750} onConfirmChange={changeProjectName} />
          <button><ChevronDown strokeWidth={2} size={20} /></button>
          <FavoritedButton />
          <StatusButton status={project.status} />
        </div>

        <div className="flex gap-2 items-center justify-end mr-8">
          <button className="flex">
            <div className="border rounded-full border-red-600 bg-red-400 w-6 h-6 translate-x-[6px] outline outline-2 outline-white" />
            <div className="flex items-center justify-center border rounded-full border-gray-300 bg-gray-100 w-6 h-6"><Ellipsis color="#6b6b6b" size={15} strokeWidth={3} /></div>
          </button>

          <button className="border border-gray-300 w-14 h-7 bg-blue-500 rounded-md text-white text-sm">Share</button>
        </div>
      </div>

      <div>
        <div className="flex gap-6 mt-3 pl-10 text-xs border-b-2 border-gray-300 font-semibold">
          <Link href={`/dashboard/projects/${id}/overview`} className="z-10 group">
            <div className='flex'>
              <span className={`invisible scale-105 font-bold flex items-center gap-1`}><PanelsTopLeft size={14} />Overview</span>
              <span className={`absolute ${projectView === 'overview' ? 'scale-105 font-bold' : 'group-hover:scale-105 transition-all'} flex items-center gap-0.5`}><PanelsTopLeft size={14} />Overview</span>
            </div>
            <div className={`${projectView === 'overview' ? 'scale-x-100' : 'scale-x-0'} bg-[black] w-full h-[1.5px] translate-y-[1.5px] transition-transform duration-500`} />
          </Link>

          <Link href={`/dashboard/projects/${id}/list`} className="z-10 group">
            <div className='flex'>
              <span className={`invisible scale-105 font-bold flex items-center gap-1`}><ListOrdered size={14} />List</span>
              <span className={`absolute ${projectView === 'list' ? 'scale-105 font-bold' : 'group-hover:scale-105 transition-all'} flex items-center gap-0.5`}><ListOrdered size={16} />List</span>
            </div>
            <div className={`${projectView === 'list' ? 'scale-x-100' : 'scale-x-0'} bg-[black] w-full h-[1.5px] translate-y-[1.5px] transition-transform duration-500`} />
          </Link>

          <Link href={`/dashboard/projects/${id}/board`} className="z-10 group">
            <div className='flex'>
              <span className={`invisible scale-105 font-bold flex items-center gap-1`}><SquareKanban size={14} />Board</span>
              <span className={`absolute ${projectView === 'board' ? 'scale-105 font-bold' : 'group-hover:scale-105 transition-all'} flex items-center gap-0.5`}><SquareKanban size={14} />Board</span>
            </div>
            <div className={`${projectView === 'board' ? 'scale-x-100' : 'scale-x-0'} bg-[black] w-full h-[1.5px] translate-y-[1.5px] transition-transform duration-500`} />
          </Link>

          <Link href={`/dashboard/projects/${id}/calendar`} className="z-10 group">
            <div className='flex'>
              <span className={`invisible scale-105 font-bold flex items-center gap-1`}><Calendar size={14} />Calendar</span>
              <span className={`absolute ${projectView === 'calendar' ? 'scale-105 font-bold' : 'group-hover:scale-105 transition-all'} flex items-center gap-0.5`}><Calendar size={14} />Calendar</span>
            </div>
            <div className={`${projectView === 'calendar' ? 'scale-x-100' : 'scale-x-0'} bg-[black] w-full h-[1.5px] translate-y-[1.5px] transition-transform duration-500`} />
          </Link>
        </div>
      </div>

    </div>
  )
}


export default Header