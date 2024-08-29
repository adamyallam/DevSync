'use client'
import { useState } from 'react';

//Component Imports
import { OpenContext } from '@/components/context/OpenContext';
import TopBar from '../dashboard/TopBar';
import SideBar from '../dashboard/SideBar';
import ToggleButton from './ToggleButton';


interface Props {
    children: React.ReactNode
}

export const IsOpenProvider: React.FC<Props> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    
    const updateIsOpen = (newState: boolean) => {
        setIsOpen(newState);
    };

  return (
    <div>
      <OpenContext.Provider value={isOpen}>
        <TopBar toggleButton={<ToggleButton updateIsOpen={updateIsOpen} />}>
          <SideBar />
        </TopBar>
        {children}
      </OpenContext.Provider>
    </div>
  );
}

export default IsOpenProvider