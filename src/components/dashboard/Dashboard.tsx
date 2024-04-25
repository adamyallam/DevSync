'use client'
import React, {useState} from 'react'
import NavBar from './NavBar'
import Display from './Display'


export const Dashboard: React.FC = () => { 
    const [page, setPage] = useState<string>('Home')

    return (
        <div>
            <NavBar setPage={setPage}/>
            <Display page={page}/>
        </div>
    )
}

export default Dashboard