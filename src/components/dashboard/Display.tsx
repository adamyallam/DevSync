import React from 'react';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Inbox from './pages/Inbox';
import Calendar from './pages/Calendar';
import Project from './pages/Project';
import Workspace from './pages/Workspace';

interface DisplayProps {
    page: string
}

export const Display: React.FC<DisplayProps> = ({page}) => {

    if (page == 'Home') {
        return (
            <div>
                <Home />
            </div>
        )
    } else if (page == 'Tasks') {
        return (
            <div><Tasks /></div>
        )
    } else if (page == 'Inbox') {
        return (
            <div><Inbox /></div>
        )
    }else if (page == 'Calendar') {
        return (
            <div><Calendar /></div>
        )
    }else if (page == 'Project') {
        return (
            <div><Project /></div>
        )
    }else if (page == 'Workspace') {
        return (
            <div><Workspace /></div>
        )
    }

    return (
        <div><Home /></div>
    )

}

export default Display