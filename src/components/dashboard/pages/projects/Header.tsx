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

  return (
    <div className='mt-16 w-full'>
      <div className="flex">
        <div className='flex gap-2 w-full'>
          <div className="border-2 border-red-500 bg-red-300 w-8 h-8 rounded-xl ml-8" />
          <AutoResizingInput initialWidth={125} initialText={project.name} maxGrowthWidth={750} />
          <button><ChevronDown strokeWidth={2} size={20} /></button>
          <FavoritedButton />
          <StatusButton status={project.status}/>
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
        <div className="flex gap-4 mt-2 pl-10 text-xs border-b-2 border-gray-300 font-semibold">
          <Link href={`/dashboard/projects/${id}/overview`} className="z-10 group"><div className={`${projectView === 'overview' ? '' : 'group-hover:scale-105 transition-all'} flex items-center gap-1`}><PanelsTopLeft size={14} />Overview</div> <div className={`${projectView === 'overview' ? '' : 'hidden'} bg-[black] w-full h-[1.5px] translate-y-[1.5px] transition-transform`} /></Link>
          <Link href={`/dashboard/projects/${id}/list`} className="z-10 group"><div className={`${projectView === 'list' ? '' : 'group-hover:scale-105 transition-all'} flex items-center gap-1`}><ListOrdered size={16} />List</div> <div className={`${projectView === 'list' ? '' : 'hidden'} bg-[black] w-full h-[1.5px] translate-y-[1.5px] transition-transform`} /></Link>
          <Link href={`/dashboard/projects/${id}/board`} className="z-10 group"><div className={`${projectView === 'board' ? '' : 'group-hover:scale-105 transition-all'} flex items-center gap-1`}><SquareKanban size={14} />Board</div> <div className={`${projectView === 'board' ? '' : 'hidden'} bg-[black] w-full h-[1.5px] translate-y-[1.5px] transition-transform`} /></Link>
          <Link href={`/dashboard/projects/${id}/calendar`} className="z-10 group"><div className={`${projectView === 'calendar' ? '' : 'group-hover:scale-105 transition-all'} flex items-center gap-1`}><Calendar size={14} />Calendar</div> <div className={`${projectView === 'calendar' ? '' : 'hidden'} bg-[black] w-full h-[1.5px] translate-y-[1.5px] transition-transform`} /></Link>
        </div>
      </div>

    </div>
  )
}


export default Header