'use client'
import React, {useState} from 'react'
import NavBar from './NavBar'
import Display from './Display'


export const Dashboard: React.FC = () => { 
    const [page, setPage] = useState<string>('Home')
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

    return (
        <div>
            <NavBar setPage={setPage} isOpen={isOpen} toggleMenu={toggleMenu}/>
            <Display page={page} isOpen={isOpen}/>
        </div>
    )
}

export default Dashboard