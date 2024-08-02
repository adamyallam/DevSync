'use client'
import React, { Children } from 'react';
import { useContext } from 'react';

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';
import { pageTitle } from '@/utils/pageTitle';

interface Props {
  toggleButton: React.ReactNode,
  children: React.ReactNode
}

export const TopBar: React.FC<Props> = (props) => {
  const isOpen = useContext(OpenContext);

  return (
    <div className='pb-24'>
      <div className='fixed w-full top-0 z-10'>
        <div className='grid grid-cols-3 bg-gray-700 p-3'>
          
          <div className='flex'>
            {props.toggleButton}
            <button className='border-2 p-1 bg-white rounded-full w-16 h-8'>Create</button>
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