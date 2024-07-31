'use client'
import Link from 'next/link'
import React from 'react';
import { usePathname } from 'next/navigation'
import { useContext } from 'react';
import { Instagram, Twitter, Linkedin, Home, CircleCheck, Inbox, CalendarCheck, UserRound } from 'lucide-react'
import { Transition } from '@headlessui/react'

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';
import { pageTitle } from '@/utils/pageTitle';

interface Props {
  toggleButton: React.ReactNode
}

export const NavBar: React.FC<Props> = ({toggleButton}) => {
  const isOpen = useContext(OpenContext);

  return (
    <div>
      <h1 className={`transition-all duration-300 text-2xl ${isOpen ? 'mt-20 ml-8 translate-x-60' : 'mt-20 ml-8'}`}>{pageTitle()}</h1>
      <div className='fixed w-full top-0 z-10'>
        <div className='grid grid-cols-3 bg-gray-700 p-3'>
          
          <div className='flex'>
            {toggleButton}
            <button className='border-2 p-1 bg-white rounded-full w-16 h-8'>Create</button>
          </div>

          <div className='flex justify-end col-start-3'>
            <button className='border-2 p-1 bg-white rounded-full w-8 h-8 text'>PFP</button>
          </div>
        </div>

          <Transition
          show={isOpen}
          enter="transform transition duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className='h-screen bg-gray-700 w-60 border-t-2 border-gray-600'>
            <div className='flex flex-col mt-7 text-gray-200'>
              <div className='mb-7'>
                  <Link href='/dashboard/home' className={`flex items-center h-8 ${pageTitle() === 'Home' ? 'bg-black bg-opacity-60 rounded-lg w-52 h-8 ml-4 pl-4' : 'ml-8 hover:bg-gray-800 hover:bg-opacity-60 hover:rounded-lg hover:w-52 hover:h-8 hover:ml-4 hover:pl-4'}`}>

                    <Home size={20} color="#e5e7eb" strokeWidth={1.5}/>
                    <span className='ml-1 text-sm'>Home</span>

                  </Link>

                <Link href='/dashboard/tasks' className={`flex items-center h-8 ${pageTitle() === 'Tasks' ? 'bg-black bg-opacity-60 rounded-lg w-52 h-8 ml-4 pl-4' : 'ml-8 hover:bg-gray-800 hover:bg-opacity-60 hover:rounded-lg hover:w-52 hover:h-8 hover:ml-4 hover:pl-4'}`}>
                    <CircleCheck size={20} color="#e5e7eb" strokeWidth={1.5}/>
                    <span className='ml-1 text-sm'>Tasks</span>
                </Link>

                <Link href='/dashboard/inbox' className={`flex items-center h-8 ${pageTitle() === 'Inbox' ? 'bg-black bg-opacity-60 rounded-lg w-52 h-8 ml-4 pl-4' : 'ml-8 hover:bg-gray-800 hover:bg-opacity-60 hover:rounded-lg hover:w-52 hover:h-8 hover:ml-4 hover:pl-4'}`} >
                  
                    <Inbox size={20} color="#e5e7eb" strokeWidth={1.5}/>
                    <span className='ml-1 text-sm'>Inbox</span>

                </Link>
              </div>

              <div className='mb-7 text-gray-200'>
                <h1 className='ml-8 mb-1 font-bold'>Insights</h1>

                <Link href='/dashboard/calendar' className={`flex items-center  h-8 ${pageTitle() === 'Calendar' ? 'bg-black bg-opacity-60 rounded-lg w-52 h-8 ml-5 pl-5' : 'ml-10 hover:bg-gray-800 hover:bg-opacity-60 hover:rounded-lg hover:w-52 hover:h-8 hover:ml-5 hover:pl-5'}`}>
                    <CalendarCheck size={20} color="#e5e7eb" strokeWidth={1.5}/>
                    <span className='ml-1 text-sm'>Calendar</span>
                </Link>
              </div>

              <div className='mb-7 text-gray-200'>
                <h1 className='ml-8 mb-1 font-bold'>Projects</h1>

                <Link href='/dashboard/project' className={`flex items-center  h-8 ${pageTitle() === 'Project' ? 'bg-black bg-opacity-60 rounded-lg w-52 h-8 ml-5 pl-5' : 'ml-10 hover:bg-gray-800 hover:bg-opacity-60 hover:rounded-lg hover:w-52 hover:h-8 hover:ml-5 hover:pl-5'}`}>
                    <div className='border-2 bg-white rounded-md w-4 h-4' />
                    <span className='ml-2 text-sm'>ProjectName</span>
                </Link>
              </div>

              <div className='text-gray-200 '>
                <h1 className='ml-8 mb-1 font-bold'>Team</h1>

                <Link href='/dashboard/workspace' className={`flex items-center  h-8 ${pageTitle() === 'Workspace' ? 'bg-black bg-opacity-60 rounded-lg w-52 h-8 ml-5 pl-5' : 'ml-10 hover:bg-gray-800 hover:bg-opacity-60 hover:rounded-lg hover:w-52 hover:h-8 hover:ml-5 hover:pl-5'}`}>

                    <UserRound size={20} color="#e5e7eb" strokeWidth={1.5}/>
                    <span className='ml-1 text-sm'>Workspace</span>
                </Link>
              </div>

              <div className='mt-44 bottom-0 w-60 pb-8 z-10 bg-gray-700 border-t-2'>
                <div className='flex justify-center mt-4'>
                  <button className='border-2 w-48 h-10'>Create Project</button>
                </div>
                
                <div className='flex justify-center gap-2 mt-3'>
                  <Instagram size={24} color="#e5e7eb" strokeWidth={1.5} />
                  <Twitter size={24} color="#e5e7eb" strokeWidth={1.5} />
                  <Linkedin size={24} color="#e5e7eb" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </Transition>

      </div>
    </div>
  )
}

export default NavBar