'use client'

import useNavbarUIContext from '@/utils/hooks/useNavbarUIContext';

// Component Imports
import Transition from '../Transition';


export const Calendar = () => { 
    const { isSidebarOpen } = useNavbarUIContext();

    return (
        <div>
            <Transition transition='translate-x-60' classes='mt-20 ml-8'>
                <h1 className='text-2xl'>Calendar</h1>
            </Transition>
        </div>
    )
}

export default Calendar