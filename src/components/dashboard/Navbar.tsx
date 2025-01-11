'use client'
import Link from 'next/link'
import React from 'react';
import { useState, useEffect } from 'react';
import { Instagram, Twitter, Linkedin, Home, CircleCheck, X, MenuIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { usePathSegments } from '@/utils/hooks/usePathSegments';
import useNavbarUIContext from '@/utils/hooks/context/useNavbarUIContext';
import useProjectsDataContext from '@/utils/hooks/context/useProjectDataProvider';
import { motion, AnimatePresence } from 'framer-motion'
import ProjectLink from '../styledElements/ProjectLink';
import { BouncingDots } from '../styledElements/LoadingElements';
import CreateProjectForm from './pages/projects/CreateProjectForm';

export const Navbar = () => {
  const { isSidebarOpen, toggleSidebar, isCreateProjectFormOpen, toggleCreateProjectForm } = useNavbarUIContext();
  const { projects, loading } = useProjectsDataContext()

  const [isProjectsCollapsed, setIsProjectsCollapsed] = useState(false)

  const favoritedProjects = projects?.filter(project => project.favorited === true)
  const unfavoritedProjects = projects?.filter(project => project.favorited === false)
  const totalProjectLinks = (unfavoritedProjects?.length || 0) - 1;

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

  const projectAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.2,
        ease: "easeOut"
      },
    }),
    exit: (index: number) => ({
      opacity: 0,
      y: -20,
      transition: {
        delay: (totalProjectLinks - index - 1) * 0.1,
        duration: 0.2,
        ease: "easeOut"
      },
    }),
  };

  return (
    <div className='fixed top-0 left-0 right-0 z-20 bg-primary'>
      {/* Topbar */}
      <div className='flex items-center justify-between h-12 border-b-undertone border-b'>
        <div className='flex items-center gap-3'>
          <button className='pl-3 text-primary-text hover:text-secondary-text hover:scale-110 transition-transform' onClick={() => toggleSidebar(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <MenuIcon />}
          </button>

          <button className='border bg-white rounded-full w-16 h-7'>Create</button>
        </div>

        <button className='border bg-white rounded-full w-8 h-8 mr-2'>PFP</button>
      </div>
      {/* Sidebar */}
      <div className={`flex flex-col fixed left-0 bottom-0 top-12 bg-primary text-primary-text w-60 transition-transform duration-300 border-r-2 border-undertone ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-x-hidden overflow-y-auto`}>
        <div className='bg-primary border-b border-undertone pt-2 pb-2'>
          <Link href='/dashboard/home' className={`flex items-center h-8 ${applySidebarClass('dashboard/home')}`}>
            <Home size={20} className='text-primary-text' strokeWidth={1.5} />

            <span className='ml-1 text-sm text-primary-text'>Home</span>
          </Link>
        </div>

        <div>
          <div className='relative pb-3 pt-3'>
            <div className='flex items-center gap-1 ml-5'>
              <button className={`flex items-center justify-center rounded-sm w-3.5 h-3.5 hover:scale-125 ${isProjectsCollapsed ? 'rotate-0' : `rotate-180`} duration-500 ease-in-out transition-transform`} onClick={toggleProjectsTab}>
                <ChevronDown size={16} strokeWidth={4} className='text-secondary-text hover:text-primary-text' />
              </button>

              <h1 className='font-semibold text-primary-text'>Projects</h1>
            </div>

            {loading ? (
              <div className='flex flex-col w-full'>
                <div className='ml-10 mt-3 mb-2'>
                  <BouncingDots color={'#D0E8E8'} />
                </div>
                <div className={`mt-1.5 ml-7 pl-1 w-[75%] border border-secondary-text`} />
              </div>
            ) : !projects?.length ? (
              <div className='w-full'>
                <div className='w-full flex flex-col justify-center mt-1 hover:scale-105 transition-transform hover:cursor-pointer group'>
                  <button onClick={() => toggleCreateProjectForm(!isCreateProjectFormOpen)} className='text-xs group-hover:font-semibold text-primary-text group-hover:text-secondary-text'>Create First Project</button>
                  
                  <div className='border-b w-1/2 self-center mt-1 group-hover:border-secondary-text' />
                </div>
              </div>
            ) : (
              <div className='w-full'>
                <ProjectLink key={projects[0].id} projectID={projects[0].id} name={projects[0].name} defaultView={projects[0].defaultView} />

                <div className='w-full absolute'>
                  <AnimatePresence>
                    {!isProjectsCollapsed &&
                      unfavoritedProjects?.slice(1).map((project, index) => (
                        <motion.div key={String(project.id)} variants={projectAnimation} initial='hidden' animate='visible' exit='exit' custom={index} >
                          <ProjectLink projectID={project.id} name={project.name} defaultView={project.defaultView} />
                        </motion.div>
                      ))
                    }
                  </AnimatePresence>
                </div>

                <div className={`${projects?.length <= 1 ? 'invisible' : ''} mt-1.5 ml-7 pl-1 w-[75%] border border-secondary-text transition-transform duration-500`} style={{ transform: isProjectsCollapsed ? 'translateY(0)' : `translateY(${(projects?.length || 0) * 32 - 32}px)` }} />
              </div>
            )}
          </div>
        </div>
        <div className='w-full flex flex-col mt-auto items-center border-t-2 border-undertone pb-4'>
          <button onClick={() => toggleCreateProjectForm(!isCreateProjectFormOpen)} className='text-primary-text border-2 border-gray-300 p-2 w-10/12 mt-4 hover:font-semibold hover:text-secondary-text hover:border-[#89979E] hover:scale-105 transition-transform'>Create Project</button>
          
          <div className='flex mt-2 gap-2'>
            <button><Instagram strokeWidth={1.5} className='h-6 text-primary-text hover:text-secondary-text hover:scale-105 transition-transform' /></button>
            <button><Twitter strokeWidth={1.5} className='h-6 text-primary-text hover:text-secondary-text hover:scale-105 transition-transform' /></button>
            <button><Linkedin strokeWidth={1.5} className='h-6 text-primary-text hover:text-secondary-text hover:scale-105 transition-transform' /></button>
          </div>
        </div>
      </div>
      <CreateProjectForm />
    </div>
  )
}

export default Navbar