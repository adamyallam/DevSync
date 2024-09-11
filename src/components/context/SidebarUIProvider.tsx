'use client'
import { useState, createContext } from 'react';

interface SidebarUIContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: (newState: boolean) => void;
}

export const SidebarUIContext = createContext<SidebarUIContextProps | undefined>(undefined);

interface Props {
    children: React.ReactNode
}

export const SidebarUIProvider: React.FC<Props> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
    
    const toggleSidebar = (newState: boolean) => {
        setIsSidebarOpen(newState);
    };

  return (
    <div>
      <SidebarUIContext.Provider value={{isSidebarOpen, toggleSidebar}}>
        {children}
      </SidebarUIContext.Provider>
    </div>
  );
}

export default SidebarUIProvider