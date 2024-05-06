'use client'
import { useContext } from 'react';

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';


export const Tasks = () => { 
    const isOpen = useContext(OpenContext);

    return (
        <div className={isOpen ? `ml-64` : 'ml-8'}>
            <h1 className='mt-20 text-2xl'>Tasks</h1>
        </div>
    )
}

export default Tasks