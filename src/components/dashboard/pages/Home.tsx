'use client'
import { useContext } from 'react';;
import { getCurrentDate } from '@/utils/todaysDate';
import { getDayPeriod } from '@/utils/todaysDate';

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';

export interface Props {
    name: React.ReactNode;
  }

export const Home: React.FC<Props> = (props) => { 
    const isOpen = useContext(OpenContext);
    
    return (
      <div className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-8'}`}>
        <h1 className='mt-20 text-2xl'>Home</h1>
        <div className='flex flex-col'>
          <p className='text-center text-lg'>{getCurrentDate()}</p>
          <h1 className='text-center mt-2 text-3xl'>Good {getDayPeriod()}, {props.name}</h1>
        </div>
        <div className='flex justify-center'>
          <div className='p-4 mt-4 w-[500px] bg-gray-100 rounded-full'>
            <div className='grid grid-rows-1 grid-cols-3 justify-center divide-x divide-black'>
                <p className='flex justify-center text-sm'>My Week</p>
                <p className='flex justify-center text-sm'>Tasks Completed</p>
                <p className='flex justify-center text-sm'>Collaborators</p>
            </div>
          </div>
        </div>
      </div>
    )
}


export default Home