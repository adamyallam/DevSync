'use client'
import Link from 'next/link'
import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Instagram, Twitter, Linkedin, Home, CircleCheck, Inbox, CalendarCheck, UserRound, X, MenuIcon } from 'lucide-react'
import { getPathSegments } from '@/utils/getPathSegments'

//component imports
import { SidebarUIContext } from '@/components/context/SidebarUIProvider';

export const Navbar = () => {
  const [isFixed, setIsFixed] = useState(true)
  const sidebarContext = useContext(SidebarUIContext);

  if (!sidebarContext) {
    throw new Error('SidebarUIContext must be used within a SidebarUIProvider');
  }
  const { isSidebarOpen, toggleSidebar } = sidebarContext;

  function applySidebarClass(...pagePaths: string[]) {
    const currentPath = getPathSegments(2);
  
    if (pagePaths.includes(currentPath)) {
      return 'sidebar-selected';
    } else {
      return 'sidebar-highlighted';
    }
  }

  const toggleMenu = () => {
    toggleSidebar(!isSidebarOpen);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight <= 540 ) {
        setIsFixed(false)
      } else {
        setIsFixed(true)
      }
    };

    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleScroll);
    };
  }, []);


  return (
    <div className='fixed top-0 left-0 right-0 z-20 bg-gray-700'>
      <div className='flex items-center justify-between h-12'>
        <div className='flex items-center gap-3'>
          <button className='pl-3' onClick={toggleMenu}>
            {isSidebarOpen ? <X /> : <MenuIcon />}
          </button>
          <button className='border bg-white rounded-full w-16 h-7'>Create</button>
        </div>
        
          <button className='border bg-white rounded-full w-8 h-8 mr-2'>PFP</button>
      </div>

      <div className={`fixed left-0 bottom-0 top-12 text-gray-300 bg-gray-700 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-60'}`}>
        <div className='bg-gray-700 w-60'>
          <div className='border-t-2 border-b-2 border-gray-600 pt-4 pb-4'>
            <Link href='/dashboard/home' className={`flex items-center h-8 ${applySidebarClass('dashboard/home')}`}>
              <Home size={20} color="#e5e7eb" strokeWidth={1.5}/>
              <span className='ml-1 text-sm'>Home</span>
            </Link>
            <Link href='/dashboard/tasks/list' className={`flex items-center h-8 ${applySidebarClass('tasks/list', 'tasks/calendar', 'tasks/files')}`}>
              <CircleCheck size={20} color="#e5e7eb" strokeWidth={1.5}/>
              <span className='ml-1 text-sm'>Tasks</span>
            </Link>
          
            <Link href='/dashboard/inbox/activity' className={`flex items-center h-8 ${applySidebarClass('inbox/activity', 'inbox/archive')}`} >
              <Inbox size={20} color="#e5e7eb" strokeWidth={1.5}/>
              <span className='ml-1 text-sm'>Inbox</span>
            </Link>
          </div>
        </div>

        <div className='bg-gray-700 w-60 h-64 overflow-y-hidden hover:overflow-y-auto overflow-x-hidden'>
          <div className='pb-5 pt-5'>
            <h1 className='ml-8 font-bold'>Insights</h1>
            <Link href='/dashboard/calendar' className={`flex items-center h-8 ${applySidebarClass('dashboard/calendar')}`}>
              <CalendarCheck size={20} color="#e5e7eb" strokeWidth={1.5}/>
              <span className='ml-1 text-sm'>Calendar</span>
            </Link>
          </div>
          
          <div className='pb-5'>
            <h1 className='ml-8 font-bold'>Projects</h1>
            <Link href='/dashboard/projects/overview' className={`flex items-center h-8 mb-1 ${applySidebarClass('projects/overview', 'projects/list', 'projects/board', 'projects/calendar', 'projects/files')}`}>
              <div className='border-2 bg-white rounded-md w-4 h-4' />
              <span className='ml-2 text-sm'>ProjectName</span>
            </Link>   
          </div>

          <div>
            <h1 className='ml-8 font-bold'>Team</h1>
            <Link href='/dashboard/workspace' className={`flex items-center h-8 ${applySidebarClass('dashboard/workspace')}`}>
              <UserRound size={20} color="#e5e7eb" strokeWidth={1.5}/>
              <span className='ml-1 text-sm'>Workspace</span>
            </Link>
          </div>
        </div>
      </div>

      <div className={`bg-gray-700 w-60 text-gray-200 ${isFixed ? 'fixed bottom-0' : 'fixed top-[435px]'} transition-all duration-300 ${isSidebarOpen ? '' : '-translate-x-60'}`}>
        <div className='flex flex-col items-center border-t-2 pb-3'>
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