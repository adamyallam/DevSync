'use client'
import React, { Children } from 'react';
import { useContext } from 'react';

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';

interface Props {
  toggleButton: React.ReactNode,
  children: React.ReactNode
}

export const TopBar: React.FC<Props> = (props) => {
  const isOpen = useContext(OpenContext);

  return (
    <div>
      <div className='fixed w-full top-0 z-20'>
        <div className='grid grid-cols-3 bg-gray-700 p-2'>
          
          <div className='flex items-center ml-2'>
            {props.toggleButton}
            <button className='border-2 p-1 bg-white rounded-full w-14 h-6'>Create</button>
          </div>

          <div className='flex justify-end col-start-3'>
            <button className='border-2 p-1 bg-white rounded-full w-8 h-8 text'>PFP</button>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default TopBar