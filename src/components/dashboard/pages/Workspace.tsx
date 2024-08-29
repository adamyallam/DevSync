'use client'
import { useContext } from 'react';

// Component Imports
import { SidebarUIContext } from '@/components/context/SidebarUIContext';


export const Workspace = () => { 
    const isOpen = useContext(SidebarUIContext);

    return (
        <div className={isOpen ? `ml-64` : 'ml-8'}>
            <h1 className='mt-20 text-2xl'>Workspace</h1>
        </div>
    )
}

export default Workspace