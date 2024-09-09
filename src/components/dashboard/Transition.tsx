'use client'
import { useContext } from 'react';

// Component Imports
import { SidebarUIContext } from '@/components/context/SidebarUIProvider';

export interface Props {
    children: React.ReactNode;
    transition: string
    classes?: string
}

export const Transition: React.FC<Props> = (props) => { 
  const isSidebarOpen = useContext(SidebarUIContext);

  return (
    <div className={`transition-all duration-300 ${props.classes} ${isSidebarOpen ? `${props.transition}` : ''}`}>
        {props.children}
    </div>
  )
}

export default Transition