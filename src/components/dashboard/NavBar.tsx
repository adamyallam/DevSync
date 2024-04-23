'use client'
import React, { useState } from 'react';
import {MenuIcon, X, Instagram, Twitter, Linkedin, Home, CircleCheck, Inbox, CalendarCheck, UserRound} from 'lucide-react'




export default function NavBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState('Home');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const selectedPage = (pageTitle: string) => {
    setPage(pageTitle)
    let test = `ml-6 border-2 w-40`
  }

  return (
    <div className='fixed w-full top-0 z-10'>
      <div className='grid grid-cols-3 bg-gray-700 p-3'>
        
        <div className='flex'>
          <button className='mr-4 ' onClick={toggleMenu}>
            {isOpen ? <X /> : <MenuIcon />}
          </button>
          <button className='border-2 p-1 bg-white rounded-full w-16 h-8'>Create</button>
        </div>

        <div className='flex justify-end col-start-3'>
          <button className='border-2 p-1 bg-white rounded-full w-8 h-8 text'>PFP</button>
        </div>
      </div>

      {isOpen && (
        <div className=' h-screen bg-gray-700 w-60 border-t-2 border-gray-600'>
          <div className='flex flex-col mt-7 text-gray-200'>
            <div className='mb-7'>
              <button className={`flex items-center h-8 ${page === 'Home' ? 'bg-black bg-opacity-60 rounded-lg w-52 h-8 ml-4 pl-4' : 'ml-8 hover:bg-gray-800 hover:bg-opacity-60 hover:rounded-lg hover:w-52 hover:h-8 hover:ml-4 hover:pl-4'}`} 
                onClick={() => selectedPage('Home')}>
                <Home size={20} color="#e5e7eb" strokeWidth={1.5}/>
                <span className='ml-1 text-sm'>Home</span>
              </button>

              <button className={`flex items-center h-8 ${page === 'Tasks' ? 'bg-black bg-opacity-60 rounded-lg w-52 h-8 ml-4 pl-4' : 'ml-8 hover:bg-gray-800 hover:bg-opacity-60 hover:rounded-lg hover:w-52 hover:h-8 hover:ml-4 hover:pl-4'}`} 
                onClick={() => selectedPage('Tasks')}>
                <CircleCheck size={20} color="#e5e7eb" strokeWidth={1.5}/>
                <span className='ml-1 text-sm'>Tasks</span>
              </button>

              <button className={`flex items-center h-8 ${page === 'Inbox' ? 'bg-black bg-opacity-60 rounded-lg w-52 h-8 ml-4 pl-4' : 'ml-8 hover:bg-gray-800 hover:bg-opacity-60 hover:rounded-lg hover:w-52 hover:h-8 hover:ml-4 hover:pl-4'}`} 
                onClick={() => selectedPage('Inbox')}>
                <Inbox size={20} color="#e5e7eb" strokeWidth={1.5}/>
                <span className='ml-1 text-sm'>Inbox</span>
              </button>
            </div>

            <div className='mb-7 text-gray-200'>
              <h1 className='ml-8 mb-1 font-bold'>Insights</h1>

              <button className={`flex items-center  h-8 ${page === 'Calendar' ? 'bg-black bg-opacity-60 rounded-lg w-52 h-8 ml-5 pl-5' : 'ml-10 hover:bg-gray-800 hover:bg-opacity-60 hover:rounded-lg hover:w-52 hover:h-8 hover:ml-5 hover:pl-5'}`} 
                onClick={() => selectedPage('Calendar')}>
                <CalendarCheck size={20} color="#e5e7eb" strokeWidth={1.5}/>
                <span className='ml-1 text-sm'>Calendar</span>
              </button>
            </div>

            <div className='mb-7 text-gray-200'>
              <h1 className='ml-8 mb-1 font-bold'>Projects</h1>

              <button className={`flex items-center h-8 ${page === 'ProjectName' ? 'bg-black bg-opacity-60 rounded-lg w-52 h-8 ml-5 pl-5' : 'ml-10 hover:bg-gray-800 hover:bg-opacity-60 hover:rounded-lg hover:w-52 hover:h-8 hover:ml-5 hover:pl-5'}`} 
                onClick={() => selectedPage('ProjectName')}>
                <div className='border-2 bg-white rounded-md w-4 h-4' />
                <span className='ml-2 text-sm'>ProjectName</span>
              </button>
            </div>

            <div className='text-gray-200 '>
              <h1 className='ml-8 mb-1 font-bold'>Team</h1>

              <button className={`flex items-center h-8 ${page === 'Workspace' ? 'bg-black bg-opacity-60 rounded-lg w-52 h-8 ml-5 pl-5' : 'ml-10 hover:bg-gray-800 hover:bg-opacity-60 hover:rounded-lg hover:w-52 hover:h-8 hover:ml-5 hover:pl-5'}`} 
                onClick={() => selectedPage('Workspace')}>
                <UserRound size={20} color="#e5e7eb" strokeWidth={1.5}/>
                <span className='ml-1 text-sm'>Workspace</span>
              </button>
            </div>

            <div className='fixed bottom-0 w-60 pb-8 z-10 bg-gray-700 border-t-2'>
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
      )}
    </div>
  )
}
