'use client'
import { useState, createContext } from 'react';

interface NavbarUIContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: (newState: boolean) => void;
  isCreateProjectFormOpen: boolean;
  toggleCreateProjectForm: (newState: boolean) => void
}

export const NavbarUIContext = createContext<NavbarUIContextProps | undefined>(undefined);

interface Props {
    children: React.ReactNode
}

export const NavbarUIProvider: React.FC<Props> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
    const [isCreateProjectFormOpen, setCreateProjectOpen] = useState(false)
    
    const toggleSidebar = (newState: boolean) => {
        setIsSidebarOpen(newState);
    };

    const toggleCreateProjectForm = (newState: boolean) => {
      setCreateProjectOpen(newState)
    }

  return (
    <div>
      <NavbarUIContext.Provider value={{isSidebarOpen, toggleSidebar, isCreateProjectFormOpen, toggleCreateProjectForm}}>
        {children}
      </NavbarUIContext.Provider>
    </div>
  );
}

export default NavbarUIProvider