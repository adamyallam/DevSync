'use client'
import { useState, createContext } from 'react';

interface NavbarUIContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: (newState: boolean) => void;
}

export const NavbarUIContext = createContext<NavbarUIContextProps | undefined>(undefined);

interface Props {
    children: React.ReactNode
}

export const NavbarUIProvider: React.FC<Props> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
    
    const toggleSidebar = (newState: boolean) => {
        setIsSidebarOpen(newState);
    };

  return (
    <div>
      <NavbarUIContext.Provider value={{isSidebarOpen, toggleSidebar}}>
        {children}
      </NavbarUIContext.Provider>
    </div>
  );
}

export default NavbarUIProvider