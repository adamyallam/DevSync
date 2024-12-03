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
  const { isSidebarOpen, toggleSidebar } = useNavbarUIContext();
  const [isProjectsCollapsed, setIsProjectsCollapsed] = useState(false)
  const [isCreateProjectOpen, setCreateProjectOpen] = useState(false)
  const { projects } = useProjectsDataContext()

  const toggleCreateProject = () => {
    setCreateProjectOpen((prev) => !prev)
  }

  const toggleProjectsTab = () => {
    setIsProjectsCollapsed(!isProjectsCollapsed)
  }

  const toggleMenu = () => {
    toggleSidebar(!isSidebarOpen);
  }

  const currentPath = usePathSegments(2);
  function applySidebarClass(...pagePaths: string[]) {

    if (pagePaths.includes(currentPath)) {
      return 'sidebar-selected';
    } else {
      return 'sidebar-highlighted';
    }
  }

  // const createProject = async () => {
  //   const projectData = {
  //     name: "New Project 3",
  //     description: "This is a test project for development purposes",
  //     dueDate: "2024-12-31T00:00:00.000Z"
  //   };

  //   try {
  //     const res = await fetch("http://localhost:3000/api/project", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(projectData)
  //     });

  //     const result = await res.json();

  //     if (res.status === 201) {
  //       console.log("Project Created:", result.project);
  //     } else {
  //       console.log('An error occured, please try again later')
  //     }
  //   } catch (error) {
  //     console.error("Error creating project:", error);
  //   }
  // };

  return (
      <div className='fixed top-0 left-0 right-0 z-20 bg-[#1b1717]'>
        {/* Topbar */}
        <div className='flex items-center justify-between h-12'>
          <div className='flex items-center gap-3'>
            <button className='pl-3 text-[#f3f4f6] hover:text-[#bdb6b6] hover:scale-110 transition-transform' onClick={toggleMenu}>
              {isSidebarOpen ? <X /> : <MenuIcon />}
            </button>
            <button className='border bg-white rounded-full w-16 h-7'>Create</button>
          </div>
          <button className='border bg-white rounded-full w-8 h-8 mr-2'>PFP</button>
        </div>
        {/* Sidebar */}
        <div className={`flex flex-col fixed left-0 bottom-0 top-12 bg-[#1b1717] text-[#f3f4f6] w-60 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-x-hidden overflow-y-auto`}>
          <div className='bg-[#1b1717] border-t-2 border-b-2 border-[#403939] pt-2 pb-2'>
            <Link href='/dashboard/home' className={`flex items-center h-8 ${applySidebarClass('dashboard/home')}`}>
              <Home size={20} className='text-[#f3f4f6]' strokeWidth={1.5} />
              <span className='ml-1 text-sm text-[#f3f4f6]'>Home</span>
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
              <h1 className='font-semibold pl-2 ml-6 text-[#f3f4f6]'>Projects</h1>
              {projects?.length ? (
                <div>
                  <ProjectLink key={projects[0].id} projectID={projects[0].id} name={projects[0].name} />
                  {!isProjectsCollapsed &&
                    projects.slice(1).map((project) => (
                      <ProjectLink key={project.id} projectID={project.id} name={project.name} />
                    ))
                  }
                </div>
              ) : (
                <div className='ml-10 mt-3 mb-2'>
                  <BouncingDots color={'#f3f4f6'} />
                </div>
              )}

              <div className='border-t-2 border-[#403939] mt-1 ml-7 pl-1 w-3/4'>
                <button className={`flex items-center justify-center rounded-sm mt-1 w-3.5 h-3.5 hover:scale-125 transition-transform`} onClick={toggleProjectsTab}>
                  {isProjectsCollapsed ? <ChevronDown size={16} strokeWidth={4} className='text-[#f3f4f6] hover:text-[#bdb6b6]'/> : <ChevronUp size={16} strokeWidth={4} className='text-[#f3f4f6]'/>}
                </button>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col mt-auto items-center border-t-2 border-[#403939] pb-4'>
            <button onClick={toggleCreateProject} className='text-[#f3f4f6] border-2 border-gray-300 p-2 w-10/12 mt-4 hover:font-semibold hover:text-[#bdb6b6] hover:border-[#bdb6b6] hover:scale-105 transition-transform'>Create Project</button>
            <div className='flex mt-2 gap-2'>
              <button><Instagram strokeWidth={1.5} className='h-6 text-[#f3f4f6] hover:text-[#bdb6b6] hover:scale-105 transition-transform'/></button>
              <button><Twitter strokeWidth={1.5} className='h-6 text-[#f3f4f6] hover:text-[#bdb6b6] hover:scale-105 transition-transform'/></button>
              <button><Linkedin strokeWidth={1.5} className='h-6 text-[#f3f4f6] hover:text-[#bdb6b6] hover:scale-105 transition-transform'/></button>
            </div>
          </div>
        </div>
        <CreateProjectForm isOpen={isCreateProjectOpen} onClose={toggleCreateProject}/>
      </div>
  )
}

export default Navbar