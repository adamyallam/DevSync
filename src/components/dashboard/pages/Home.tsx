'use client'
import { useContext } from 'react';

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';

export const Home = () => { 
    const isOpen = useContext(OpenContext);
    
    return (
        <div className={isOpen ? `flex justify-center text-2xl` : 'flex justify-end text-2xl'}>
            <h1 className='mt-20 mr-40'>Home</h1>
        </div>
    )
}

export default Home