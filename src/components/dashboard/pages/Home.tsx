'use client'
import { useContext } from 'react';

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';

export interface Props {
    name: React.ReactNode;
  }

export const Home: React.FC<Props> = (props) => { 
    const isOpen = useContext(OpenContext);
    
    return (
        <div className={isOpen ? `ml-64` : 'ml-8'}>
            <h1 className='mt-20 text-2xl'>Welcome, {props.name}</h1>
        </div>
    )
}

export default Home