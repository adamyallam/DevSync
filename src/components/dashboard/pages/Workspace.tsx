'use client'
import { useContext } from 'react';

// Component Imports
import { NavbarUIContext } from '@/components/dashboard/context/NavbarUIProvider';


export const Workspace = () => { 
    const sidebarContext = useContext(NavbarUIContext);
    if (!sidebarContext) {
        throw new Error('NavbarUIContext must be used within a SidebarUIProvider');
    }
    const { isSidebarOpen } = sidebarContext;;

    return (
        <div className={isSidebarOpen ? `ml-64` : 'ml-8'}>
            <h1 className='mt-20 text-2xl'>Workspace</h1>
        </div>
    )
}

export default Workspace