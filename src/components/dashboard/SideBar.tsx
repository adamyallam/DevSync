'use client'
import Link from 'next/link'
import React from 'react';
import { useContext } from 'react';
import { Instagram, Twitter, Linkedin, Home, CircleCheck, Inbox, CalendarCheck, UserRound } from 'lucide-react'

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';
import { applySidebarClass } from '@/utils/getPageTitle';

export const SideBar = () => {
  const isOpen = useContext(OpenContext);

  return (
    <div className={`transition-all duration-300 text-gray-200 ${isOpen ? '' : '-translate-x-60'}`}>
      <div className='h-screen bg-gray-700 w-60 border-t-2 border-gray-600 overflow-auto'>
          <div className='mt-4'>
            <Link href='/dashboard/home' className={`flex items-center h-8 ${applySidebarClass('Home')}`}>

              <Home size={20} color="#e5e7eb" strokeWidth={1.5}/>
              <span className='ml-1 text-sm'>Home</span>

            </Link>

            <Link href='/dashboard/tasks' className={`flex items-center h-8 ${applySidebarClass('Tasks')}`}>
                <CircleCheck size={20} color="#e5e7eb" strokeWidth={1.5}/>
                <span className='ml-1 text-sm'>Tasks</span>
            </Link>

            <Link href='/dashboard/inbox' className={`flex items-center h-8 ${applySidebarClass('Inbox')}`} >
              
                <Inbox size={20} color="#e5e7eb" strokeWidth={1.5}/>
                <span className='ml-1 text-sm'>Inbox</span>

            </Link>
            <div className='border-t-2 border-gray-600 mb-4 mt-4'/>
          </div>

          <div className=''>
            <div className='mb-7 text-gray-200'>
              <h1 className='ml-8 mb-1 font-bold'>Insights</h1>

              <Link href='/dashboard/calendar' className={`flex items-center  h-8 ${applySidebarClass('Calendar')}`}>
                  <CalendarCheck size={20} color="#e5e7eb" strokeWidth={1.5}/>
                  <span className='ml-1 text-sm'>Calendar</span>
              </Link>
            </div>

            <div className='mb-7 text-gray-200'>
              <h1 className='ml-8 mb-1 font-bold'>Projects</h1>

              <Link href='/dashboard/project' className={`flex items-center  h-8 ${applySidebarClass('Project')}`}>
                  <div className='border-2 bg-white rounded-md w-4 h-4' />
                  <span className='ml-2 text-sm'>ProjectName</span>
              </Link>

            </div>

            <div className='text-gray-200 mb-3'>
              <h1 className='ml-8 mb-1 font-bold'>Team</h1>

              <Link href='/dashboard/workspace' className={`flex items-center  h-8 ${applySidebarClass('Workspace')}`}>

                  <UserRound size={20} color="#e5e7eb" strokeWidth={1.5}/>
                  <span className='ml-1 text-sm'>Workspace</span>
              </Link>
            </div>
          </div>

          <div className='flex flex-col border-t-2'>
            <div className='flex justify-center mt-4'>
              <button className='border-2 p-2 w-11/12'>Create Project</button>
            </div>
            <div className='flex justify-center gap-3 mt-2'>
              <Instagram size={24} color="#e5e7eb" strokeWidth={1.5} />
              <Twitter size={24} color="#e5e7eb" strokeWidth={1.5} />
              <Linkedin size={24} color="#e5e7eb" strokeWidth={1.5} />
            </div>
            <div className='mb-12' />
          </div>       
      </div>
    </div>
  )
}

export default SideBar