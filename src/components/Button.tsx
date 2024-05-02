import {MenuIcon, X } from 'lucide-react'
import { useContext } from 'react';
import { OpenContext } from '@/components/OpenContext';

interface Props {
    updater: (newIsOpen: boolean) => void
}

export const Button: React.FC<Props> = ({updater}) => { 
    const isOpen = useContext(OpenContext)
    const toggleMenu = () => {
        updater(!isOpen);
      }

    return (
        <div className='flex'>
            <button className='mr-4' onClick={toggleMenu}>
                {isOpen ? <X /> : <MenuIcon />}
            </button>
        </div>
    )
}

export default Button