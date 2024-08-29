'use client'
import { useContext } from 'react';

// Component Imports
import { SidebarUIContext } from '@/components/context/SidebarUIContext';
import Transition from '../Transition';


export const Calendar = () => { 
    const isOpen = useContext(SidebarUIContext);

    return (
        <div>
            <Transition transition='translate-x-60' classes='mt-20 ml-8'>
                <h1 className='text-2xl'>Calendar</h1>
            </Transition>
        </div>
    )
}

export default Calendar