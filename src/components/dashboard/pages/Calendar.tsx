'use client'

import useNavbarUIContext from '@/utils/hooks/useNavbarUIContext';

// Component Imports


export const Calendar = () => { 
    const { isSidebarOpen } = useNavbarUIContext();

    return (
        <div className='mt-20 ml-8'>
            <h1 className='text-2xl'>Calendar</h1>
        </div>
    )
}

export default Calendar