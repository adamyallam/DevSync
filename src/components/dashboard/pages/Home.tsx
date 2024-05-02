'use client'
import { useContext } from 'react';
import { LevelContext } from '@/components/OpenContext';

export const Home = () => { 
    const isOpen = useContext(LevelContext);
    return (
        <div className={isOpen ? `flex justify-center text-2xl` : 'flex justify-end text-2xl'}>
            <h1 className='mt-20 mr-40'>Home</h1>
        </div>
    )
}

export default Home