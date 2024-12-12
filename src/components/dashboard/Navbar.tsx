'use client'
import Link from 'next/link'
import React from 'react';
import { useState, useEffect } from 'react';
import { Instagram, Twitter, Linkedin, Home, CircleCheck, X, MenuIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { usePathSegments } from '@/utils/hooks/usePathSegments';
import useNavbarUIContext from '@/utils/hooks/context/useNavbarUIContext';
import useProjectsDataContext from '@/utils/hooks/context/useProjectDataProvider';

//component imports
import ProjectLink from '../styledElements/ProjectLink';
import { BouncingDots } from '../styledElements/LoadingElements';
import CreateProjectForm from './pages/projects/CreateProjectForm';

export const Navbar = () => {
  const { isSidebarOpen, toggleSidebar, isCreateProjectFormOpen, toggleCreateProjectForm } = useNavbarUIContext();
  const [isProjectsCollapsed, setIsProjectsCollapsed] = useState(false)
  const { projects } = useProjectsDataContext()

  const toggleProjectsTab = () => {
    setIsProjectsCollapsed(!isProjectsCollapsed)
  }

  const currentPath = usePathSegments(2);
  function applySidebarClass(...pagePaths: string[]) {

    if (pagePaths.includes(currentPath)) {
      return 'sidebar-selected';
    } else {
      return 'sidebar-highlighted';
    }
  }

  return (
      <div className='fixed top-0 left-0 right-0 z-20 bg-primary'>
        {/* Topbar */}
        <div className='flex items-center justify-between h-12'>
          <div className='flex items-center gap-3'>
            <button className='pl-3 text-primary-text hover:text-secondary-text hover:scale-110 transition-transform' onClick={() => toggleSidebar(!isSidebarOpen)}>
              {isSidebarOpen ? <X /> : <MenuIcon />}
            </button>
            <button className='border bg-white rounded-full w-16 h-7'>Create</button>
          </div>
          <button className='border bg-white rounded-full w-8 h-8 mr-2'>PFP</button>
        </div>
        {/* Sidebar */}
        <div className={`flex flex-col fixed left-0 bottom-0 top-12 bg-primary text-primary-text w-60 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-x-hidden overflow-y-auto`}>
          <div className='bg-primary border-t-2 border-b-2 border-undertone pt-2 pb-2'>
            <Link href='/dashboard/home' className={`flex items-center h-8 ${applySidebarClass('dashboard/home')}`}>
              <Home size={20} className='text-primary-text' strokeWidth={1.5} />
              <span className='ml-1 text-sm text-primary-text'>Home</span>
            </Link>
            {/* Code to add My Tasks if necessary
            <Link href='/dashboard/tasks/list' className={`flex items-center h-8 ${applySidebarClass('tasks/list', 'tasks/board', 'tasks/calendar', 'tasks/files')}`}>
              <CircleCheck size={20} color="#e5e7eb" strokeWidth={1.5} />
              <span className='ml-1 text-sm'>Tasks</span>
            </Link> */}
            {/* Code to add Inbox if necassary
            <Link href='/dashboard/inbox/activity' className={`flex items-center h-8 ${applySidebarClass('inbox/activity', 'inbox/archive')}`} >
              <Inbox size={20} color="#e5e7eb" strokeWidth={1.5}/>
              <span className='ml-1 text-sm'>Inbox</span>
            </Link> */}
          </div>
          <div>
            {/* Code to add Workspace if necassary
            <div className='pb-3 pt-3'>
              <h1 className='ml-8 font-bold'>Team</h1>
              <Link href='/dashboard/workspace' className={`flex items-center h-8 ${applySidebarClass('dashboard/workspace')}`}>
                <UserRound size={20} color="#e5e7eb" strokeWidth={1.5}/>
                <span className='ml-1 text-sm'>Workspace</span>
              </Link>
            </div> */}
            <div className='pb-3 pt-3'>
              <h1 className='font-semibold pl-2 ml-6 text-primary-text'>Projects</h1>
              {projects?.length ? (
                <div>
                  <ProjectLink key={projects[0].id} projectID={projects[0].id} name={projects[0].name} defaultView={projects[0].defaultView}/>
                  {!isProjectsCollapsed &&
                    projects.slice(1).map((project) => (
                      <ProjectLink key={project.id} projectID={project.id} name={project.name} defaultView={project.defaultView} />
                    ))
                  }
                </div>
              ) : (
                <div className='ml-10 mt-3 mb-2'>
                  <BouncingDots color={'#D0E8E8'} />
                </div>
              )}

              <div className='border-t-2 border-undertone mt-1 ml-7 pl-1 w-3/4'>
                <button className={`flex items-center justify-center rounded-sm mt-1 w-3.5 h-3.5 hover:scale-125 transition-transform`} onClick={toggleProjectsTab}>
                  {isProjectsCollapsed ? <ChevronDown size={16} strokeWidth={4} className='text-primary-text hover:text-secondary-text'/> : <ChevronUp size={16} strokeWidth={4} className='text-primary-text'/>}
                </button>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col mt-auto items-center border-t-2 border-undertone pb-4'>
            <button onClick={() => toggleCreateProjectForm(!isCreateProjectFormOpen)} className='text-primary-text border-2 border-gray-300 p-2 w-10/12 mt-4 hover:font-semibold hover:text-secondary-text hover:border-secondary-text hover:scale-105 transition-transform'>Create Project</button>
            <div className='flex mt-2 gap-2'>
              <button><Instagram strokeWidth={1.5} className='h-6 text-primary-text hover:text-secondary-text hover:scale-105 transition-transform'/></button>
              <button><Twitter strokeWidth={1.5} className='h-6 text-primary-text hover:text-secondary-text hover:scale-105 transition-transform'/></button>
              <button><Linkedin strokeWidth={1.5} className='h-6 text-primary-text hover:text-secondary-text hover:scale-105 transition-transform'/></button>
            </div>
          </div>
        </div>
        <CreateProjectForm isOpen={isCreateProjectFormOpen} onClose={() => toggleCreateProjectForm(!isCreateProjectFormOpen)}/>
      </div>
  )
}

export default Navbar