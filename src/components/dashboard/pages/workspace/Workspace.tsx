'use client'


// Component Imports
import useNavbarUIContext from "@/utils/hooks/useNavbarUIContext";


export const Workspace = () => { 
    const { isSidebarOpen } = useNavbarUIContext();

    return (
        <div className={isSidebarOpen ? `ml-64` : 'ml-8'}>
            <h1 className='mt-20 text-2xl'>Workspace</h1>
        </div>
    )
}

export default Workspace