'use client'
import { getCurrentDateDisplay } from '@/utils/dateFunctions/getDateFunctions';
import { getDayPeriod } from '@/utils/dateFunctions/getDayPeriod';
import { useSession } from 'next-auth/react';
import useProjectsDataContext from '@/utils/hooks/context/useProjectDataProvider';


export const UserWelcome = () => {
  const { data: session } = useSession()
  const { projects } = useProjectsDataContext()

  if (!projects) return null

  const allTasks = projects.map((project) => project.tasks).flat();
  const completedTasks = projects.map((project) => project.tasks.filter((task) => task.completed === true)).flat();

  return (
    <div>
      <div className='flex flex-col'>
        <span className='text-center text-lg text-primary-text'>{getCurrentDateDisplay()}</span>
        <h1 className='text-center mt-2 text-3xl text-primary-text'>Good {getDayPeriod()}, {session?.firstName}</h1>
      </div>
      <div className='flex justify-center'>
        <div className='p-4 mt-4 w-[500px] bg-primary rounded-full text-primary-text'>
          <div className='grid grid-rows-1 grid-cols-3 justify-center divide-x divide-secondary-text'>
            <span className='flex justify-center text-sm'>Projects: {projects.length || '0'}</span>
            <span className='flex justify-center text-sm'>Total Tasks: {allTasks.length || '0'}</span>
            <span className='flex justify-center text-sm'>Tasks Completed: {completedTasks.length || '0'}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 


export default UserWelcome