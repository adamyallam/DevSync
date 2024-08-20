'use client'
import Link from 'next/link'
import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Instagram, Twitter, Linkedin, Home, CircleCheck, Inbox, CalendarCheck, UserRound } from 'lucide-react'
import { getPageTitle } from '@/utils/getPageTitle';

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';

export const SideBar = () => {
  const isOpen = useContext(OpenContext);
  const [isFixed, setIsFixed] = useState(true)

  function applySidebarClass(pageTitle: string) {
    if (getPageTitle() === pageTitle) {
      return 'sidebar-selected'
    } else {
      return 'sidebar-highlighted'
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight <= 510 ) {
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
    <div>
      <div className={`flex flex-col fixed h-screen text-gray-200 transition-all duration-300 ${isOpen ? '' : '-translate-x-60'}`}>
        <div className={`bg-gray-700 w-60`}> 
          <div className='border-t-2 border-b-2 border-gray-600 pt-4 pb-4'>
            <Link href='/dashboard/home' className={`flex items-center h-8 ${applySidebarClass('Home')}`}>
              <Home size={20} color="#e5e7eb" strokeWidth={1.5}/>
              <span className='ml-1 text-sm'>Home</span>
            </Link>
            <Link href='/dashboard/tasks/list' className={`flex items-center h-8 ${applySidebarClass('List')}`}>
              <CircleCheck size={20} color="#e5e7eb" strokeWidth={1.5}/>
              <span className='ml-1 text-sm'>Tasks</span>
            </Link>
            <Link href='/dashboard/inbox' className={`flex items-center h-8 ${applySidebarClass('Inbox')}`} >
              <Inbox size={20} color="#e5e7eb" strokeWidth={1.5}/>
              <span className='ml-1 text-sm'>Inbox</span>
            </Link>
          </div>
        </div>

        <div className={`bg-gray-700 w-60 flex-grow pb-[50px] transition-all duration-300 `}>{/*overflow-y-scroll overflow-x-hidden*/}
          <div className='mb-5 pt-3'>
            <h1 className='ml-8 font-bold'>Insights</h1>
            <Link href='/dashboard/calendar' className={`flex items-center h-8 ${applySidebarClass('Calendar')}`}>
              <CalendarCheck size={20} color="#e5e7eb" strokeWidth={1.5}/>
              <span className='ml-1 text-sm'>Calendar</span>
            </Link>
          </div>
          
          <div className='mb-5'>
            <h1 className='ml-8 font-bold'>Projects</h1>
            <Link href='/dashboard/projects' className={`flex items-center h-8 ${applySidebarClass('Projects')}`}>
              <div className='border-2 bg-white rounded-md w-4 h-4' />
              <span className='ml-2 text-sm'>ProjectName</span>
            </Link>
          </div>

          <div className='pb-3'>
            <h1 className='ml-8 font-bold'>Team</h1>
            <Link href='/dashboard/workspace' className={`flex items-center h-8 ${applySidebarClass('Workspace')}`}>
              <UserRound size={20} color="#e5e7eb" strokeWidth={1.5}/>
              <span className='ml-1 text-sm'>Workspace</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className={`bg-gray-700 w-60 text-gray-200 ${isFixed ? 'fixed bottom-0' : 'fixed top-[405px]'} transition-all duration-300 ${isOpen ? '' : '-translate-x-60'}`}>
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

export default SideBar