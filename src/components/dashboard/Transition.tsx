'use client'

import useNavbarUIContext from '@/utils/hooks/context/useNavbarUIContext';

// Component Imports

export interface Props {
    children: React.ReactNode;
    transition: string
    classes?: string
}

export const Transition: React.FC<Props> = (props) => { 
  const { isSidebarOpen } = useNavbarUIContext();

  return (
    <div className={`transition-all duration-300 ${props.classes} ${isSidebarOpen ? `${props.transition}` : 'ml-0'}`}>
        {props.children}
    </div>
  )
}

export default Transition