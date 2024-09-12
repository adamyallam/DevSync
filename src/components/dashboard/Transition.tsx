'use client'
import { useContext } from 'react';

// Component Imports
import { NavbarUIContext } from './context/NavbarUIProvider';

export interface Props {
    children: React.ReactNode;
    transition: string
    classes?: string
}

export const Transition: React.FC<Props> = (props) => { 
  const sidebarContext = useContext(NavbarUIContext);

  if (!sidebarContext) {
    throw new Error('NavbarUIContext must be used within a SidebarUIProvider');
  }
  
  const { isSidebarOpen } = sidebarContext;

  return (
    <div className={`transition-all duration-300 ${props.classes} ${isSidebarOpen ? `${props.transition}` : ''}`}>
        {props.children}
    </div>
  )
}

export default Transition