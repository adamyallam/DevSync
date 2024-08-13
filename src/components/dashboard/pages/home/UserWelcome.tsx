'use client'
import { getCurrentDate } from '@/utils/getDate';
import { getDayPeriod } from '@/utils/getDate';

// Component Imports

export interface Props {
    name: React.ReactNode;
  }

export const UserWelcome: React.FC<Props> = (props) => { 
    
    return (
      <div>
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


export default UserWelcome