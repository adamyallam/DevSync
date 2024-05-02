'use client'
import { OpenContext } from '@/components/OpenContext';
import { useState } from 'react';
import NavBar from './dashboard/NavBar';
import Button from './Button';


interface Props {
    children: React.ReactNode
}

export const Organizer: React.FC<Props> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    
    const updateIsOpen = (newState: boolean) => {
        setIsOpen(newState);
    };

    

  return (
    <div>
      <OpenContext.Provider value={isOpen}>
        <NavBar button={<Button updater={updateIsOpen} />}/>
        {children}
      </OpenContext.Provider>
    </div>
  );
}

export default Organizer