'use client'
import { useContext } from 'react';

// Component Imports
import { OpenContext } from '@/components/context/OpenContext';

export interface Props {
    children: React.ReactNode;
    transition: string
    classes?: string
  }

  export const Transition: React.FC<Props> = (props) => { 
    const isOpen = useContext(OpenContext);

    return (
        <div className={`transition-all duration-300 ${props.classes} ${isOpen ? `${props.transition}` : ''}`}>
            {props.children}
        </div>
    )
}

export default Transition