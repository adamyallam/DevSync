'use client'
import Link from 'next/link'
import React from 'react';
import { useState } from 'react';
import { Instagram, Twitter, Linkedin, Home, CircleCheck, Inbox, CalendarCheck, UserRound, X, MenuIcon, ChevronDown, ChevronUp} from 'lucide-react'
import { usePathSegments } from '@/utils/hooks/usePathSegments';
import useNavbarUIContext from '@/utils/hooks/useNavbarUIContext';

//component imports

export const Navbar = () => {
  const [isProjectsCollapsed, setIsProjectsCollapsed] = useState(true)
  const toggleProjectsTab = () => {
    setIsProjectsCollapsed(!isProjectsCollapsed)
  }

  const { isSidebarOpen, toggleSidebar } = useNavbarUIContext();
  const toggleMenu = () => {
    toggleSidebar(!isSidebarOpen);
  }

  const currentPath = usePathSegments(2);
  function applySidebarClass(...pagePaths: string[]) {
  
    if (pagePaths.includes(currentPath)) {
      return 'sidebar-selected';
    } else {
      return 'sidebar-highlighted';
    }
  }

  return (
    <div className='fixed top-0 left-0 right-0 z-20 bg-gray-700'>
      {/* Topbar */}
      <div className='flex items-center justify-between h-12'>
        <div className='flex items-center gap-3'>
          <button className='pl-3' onClick={toggleMenu}>
            {isSidebarOpen ? <X /> : <MenuIcon />}
          </button>
          <button className='border bg-white rounded-full w-16 h-7'>Create</button>
        </div>
        
          <button className='border bg-white rounded-full w-8 h-8 mr-2'>PFP</button>
      </div>

      {/* Sidebar */}
      <div className={`flex flex-col fixed left-0 bottom-0 top-12 bg-gray-700 text-gray-300 w-60 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-x-hidden overflow-y-auto`}>
        <div className='bg-gray-700 border-t-2 border-b-2 border-gray-600 pt-4 pb-4'>
          <Link href='/dashboard/home' className={`flex items-center h-8 ${applySidebarClass('dashboard/home')}`}>
            <Home size={20} color="#e5e7eb" strokeWidth={1.5}/>
            <span className='ml-1 text-sm'>Home</span>
          </Link>
          
          <Link href='/dashboard/tasks/board' className={`flex items-center h-8 ${applySidebarClass('tasks/list', 'tasks/calendar', 'tasks/files')}`}>
            <CircleCheck size={20} color="#e5e7eb" strokeWidth={1.5}/>
            <span className='ml-1 text-sm'>Tasks</span>
          </Link>
        
          <Link href='/dashboard/inbox/activity' className={`flex items-center h-8 ${applySidebarClass('inbox/activity', 'inbox/archive')}`} >
            <Inbox size={20} color="#e5e7eb" strokeWidth={1.5}/>
            <span className='ml-1 text-sm'>Inbox</span>
          </Link>
        </div>

        <div>
          <div className='pb-3 pt-3'>
            <h1 className='ml-8 font-bold'>Team</h1>

            <Link href='/dashboard/workspace' className={`flex items-center h-8 ${applySidebarClass('dashboard/workspace')}`}>
              <UserRound size={20} color="#e5e7eb" strokeWidth={1.5}/>
              <span className='ml-1 text-sm'>Workspace</span>
            </Link>
          </div>

          <div className='pb-3'>
            <h1 className='font-bold pl-2 ml-6'>Projects</h1>

            <Link href='/dashboard/projects/board' className={`flex items-center h-8 ${applySidebarClass('projects/overview', 'projects/list', 'projects/board', 'projects/calendar', 'projects/files')}`}>
              <div className='border-2 bg-white rounded-md w-4 h-4' />
              <span className='ml-2 text-sm'>ProjectName</span>
            </Link>
            
            {!isProjectsCollapsed && (
              <div className=''>
                <Link href='/dashboard/projects/overview' className={`flex items-center h-8 ${applySidebarClass('')}`}>
                  <div className='border-2 bg-white rounded-md w-4 h-4' />
                  <span className='ml-2 text-sm'>ProjectName</span>
                </Link>

                <Link href='/dashboard/projects/overview' className={`flex items-center h-8 ${applySidebarClass('')}`}>
                  <div className='border-2 bg-white rounded-md w-4 h-4' />
                  <span className='ml-2 text-sm'>ProjectName</span>
                </Link>
              </div>
            )}

            <div className='border-t-2 border-gray-600 mt-1 ml-7 pl-1 w-3/4'>
              <button className={`flex items-center justify-center rounded-sm mt-1 w-3.5 h-3.5 ${isProjectsCollapsed ? 'hover:bg-gray-800' : 'bg-gray-800'}`} onClick={toggleProjectsTab}>
                {isProjectsCollapsed ? <ChevronDown size={16} strokeWidth={4}/> : <ChevronUp size={16} strokeWidth={4} />}
              </button>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col mt-auto items-center border-t-2 pb-4'>
          <button className='border-2 p-2 w-11/12 mt-4'>Create Project</button>

          <div className='flex mt-2 gap-2'>
            <Instagram size={24} color="#e5e7eb" strokeWidth={1.5} />
            <Twitter size={24} color="#e5e7eb" strokeWidth={1.5} />
            <Linkedin size={24} color="#e5e7eb" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar