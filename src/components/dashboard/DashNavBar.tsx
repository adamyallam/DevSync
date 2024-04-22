'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react';
import {MenuIcon} from 'lucide-react'
import {X} from 'lucide-react'
import {Instagram} from 'lucide-react'
import {Twitter} from 'lucide-react'
import {Linkedin} from 'lucide-react'


export default function DashTopBar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // document.body.style.overflow = isOpen ? 'unset' : 'hidden';
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setHasScrolled(window.scrollY > 0);
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);


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
        <div className='border-t-2 border-gray-600'>
          <div className='grid grid-rows-8 h-screen bg-gray-700 w-60'>

            <div className='flex flex-col mt-8 text-gray-200'>
              <button className='text-left ml-8'>Home</button>
              <button className='text-left ml-8'>My Tasks</button>
              <button className='text-left ml-8'>Inbox</button>
            </div>

            <div className='mt-8 text-gray-200'>
              <h1 className='ml-8'>Insights</h1>
              <button className='ml-8'>Calendar</button>
            </div>

            <div className='mt-8 text-gray-200'>
                <h1 className='ml-8'>Projects</h1>
                <button className='ml-8'>Project Name</button>
            </div>

            <div className='mt-8 text-gray-200'>
              <h1 className='ml-8'>Team</h1>
              <button className='ml-8'>My workspace</button>
            </div>

            <div className='border-t-2 row-start-7'>
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


