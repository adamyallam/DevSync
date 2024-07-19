'use client'
import { useContext } from 'react';;
import { getCurrentDate } from '@/utils/todaysDate';
import { getDayPeriod } from '@/utils/todaysDate';

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';

export interface Props {
    name: React.ReactNode;
  }

export const Home: React.FC<Props> = (props) => { 
    const isOpen = useContext(OpenContext);
    
    return (
        <div className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-8'}`}>
            <h1 className='mt-20 text-2xl'>Home</h1>
            <div>
                <p>{getCurrentDate()}</p>
                <h1>Good {getDayPeriod()}, {props.name}</h1>
            </div>
        </div>
    )
}


export default Home