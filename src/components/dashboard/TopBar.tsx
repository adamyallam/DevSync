'use client'
import React from 'react';
import { useContext } from 'react';
import {X, MenuIcon} from 'lucide-react'

// Component Imports
import { SidebarUIContext } from '@/components/context/SidebarUIContext';

interface Props {
  updateIsOpen: (newState: boolean) => void,
  children: React.ReactNode
}

export const TopBar: React.FC<Props> = ({children, updateIsOpen}) => {
  const isOpen = useContext(SidebarUIContext);

  const toggleMenu = () => {
    updateIsOpen(!isOpen);
  }

  return (
    <div>
      <div className='fixed w-full top-0 z-20'>
        <div className='grid grid-cols-3 bg-gray-700 p-2'>
          
          <div className='flex items-center ml-2'>
            <div className='flex'>
              <button className='mr-4' onClick={toggleMenu}>
                {isOpen ? <X /> : <MenuIcon />}
              </button>
            </div>
            <button className='border-2 p-1 bg-white rounded-full w-14 h-6'>Create</button>
          </div>

          <div className='flex justify-end col-start-3'>
            <button className='border-2 p-1 bg-white rounded-full w-8 h-8 text'>PFP</button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default TopBar