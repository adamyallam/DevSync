'use client'
import { useState } from 'react';
import { OpenContext } from '@/components/OpenContext';

//Component Imports
import NavBar from './dashboard/NavBar';
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
        <NavBar toggleButton={<ToggleButton updateIsOpen={updateIsOpen} />}/>
        {children}
      </OpenContext.Provider>
    </div>
  );
}

export default IsOpenProvider