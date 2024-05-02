import {MenuIcon, X } from 'lucide-react'
import { useContext } from 'react';
import { OpenContext } from '@/components/context/OpenContext';

interface Props {
    updateIsOpen: (newState: boolean) => void
}

export const ToggleButton: React.FC<Props> = ({updateIsOpen}) => { 
    const isOpen = useContext(OpenContext)

    const toggleMenu = () => {
        updateIsOpen(!isOpen);
      }

    return (
        <div className='flex'>
            <button className='mr-4' onClick={toggleMenu}>
                {isOpen ? <X /> : <MenuIcon />}
            </button>
        </div>
    )
}

export default ToggleButton