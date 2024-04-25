'use client'
import React, { useState } from 'react';
import NavBar from './NavBar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Inbox from './pages/Inbox';
import Calendar from './pages/Calendar'
import Project from './pages/Project'
import Workspace from './pages/Workspace'


export const Dashboard: React.FC = () => { 
    const [activeButton, setActiveButton] = useState<string>('Home');

    const renderComponent = () => {
        switch (activeButton) {
            case 'Home':
                return <Home />;
            case 'Tasks':
                return <Tasks />;
            case 'Inbox':
                return <Inbox />;
            case 'Calendar':
                return <Calendar />;
            case 'Project':
                return <Project />;
            case 'Workspace':
                return <Workspace />;
            default:
                return <Home />;
            }
      };

    return (
        <div>
            <NavBar setActiveButton={setActiveButton} activeButton={activeButton}/>
            {renderComponent()}
        </div>
    )
}

export default Dashboard