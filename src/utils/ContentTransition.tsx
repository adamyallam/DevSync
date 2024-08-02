'use client'
import { useContext } from 'react';

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';

export interface Props {
    children: React.ReactNode;
  }

  export const ContentTransition: React.FC<Props> = (props) => { 
    const isOpen = useContext(OpenContext);

    return (
        <div className={`transition-all duration-300 mt-2 ${isOpen ? 'translate-x-32' : ''}`}>
            {props.children}
        </div>
    )
}

export default ContentTransition