'use client'
import { useState } from 'react';

//Component Imports
import { SidebarUIContext } from '@/components/context/SidebarUIContext';
import TopBar from '../dashboard/TopBar';
import SideBar from '../dashboard/SideBar';


interface Props {
    children: React.ReactNode
}

export const SidebarUIProvider: React.FC<Props> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    
    const updateIsOpen = (newState: boolean) => {
        setIsOpen(newState);
    };

  return (
    <div>
      <SidebarUIContext.Provider value={isOpen}>
        <TopBar updateIsOpen={updateIsOpen}>
          <SideBar />
        </TopBar>
        {children}
      </SidebarUIContext.Provider>
    </div>
  );
}

export default SidebarUIProvider