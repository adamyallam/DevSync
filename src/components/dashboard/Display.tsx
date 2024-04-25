import React from 'react';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Inbox from './pages/Inbox';
import Calendar from './pages/Calendar';
import Project from './pages/Project';
import Workspace from './pages/Workspace';

interface DisplayProps {
    page: string;
    isOpen: boolean;
}

export const Display: React.FC<DisplayProps> = ({page, isOpen}) => {

    if (page == 'Home') {
        return (
            <div className={`${isOpen ? 'mx-auto w-72' : ''}`}>
                <Home />
            </div>
        )
    } else if (page == 'Tasks') {
        return (
            <div className={`${isOpen ? 'mx-auto w-72' : ''}`}><Tasks /></div>
        )
    } else if (page == 'Inbox') {
        return (
            <div className={`${isOpen ? 'mx-auto w-72' : ''}`}><Inbox /></div>
        )
    }else if (page == 'Calendar') {
        return (
            <div className={`${isOpen ? 'mx-auto w-72' : ''}`}><Calendar /></div>
        )
    }else if (page == 'Project') {
        return (
            <div className={`${isOpen ? 'mx-auto w-72' : ''}`}><Project /></div>
        )
    }else if (page == 'Workspace') {
        return (
            <div className={`${isOpen ? 'mx-auto w-72' : ''}`}><Workspace /></div>
        )
    }

    return (
        <div><Home /></div>
    )

}

export default Display