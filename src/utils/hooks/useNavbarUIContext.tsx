import { useContext } from 'react';
import { NavbarUIContext } from '@/components/dashboard/context/NavbarUIProvider';

const useNavbarUIContext = () => {
    const context = useContext(NavbarUIContext);
    if (!context) {
        throw new Error('NavbarUIContext must be used within a SidebarUIProvider');
    }
    return context;
}

export default useNavbarUIContext