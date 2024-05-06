'use client'
import { useContext } from 'react';

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';


export const Calendar = () => { 
    const isOpen = useContext(OpenContext);

    return (
        <div className={isOpen ? `ml-64` : 'ml-8'}>
            <h1 className='mt-20 text-2xl'>Calendar</h1>
        </div>
    )
}

export default Calendar