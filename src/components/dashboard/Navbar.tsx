'use client'
import Link from 'next/link'
import React from 'react';
import { useState } from 'react';
import { Instagram, Twitter, Linkedin, Home, X, MenuIcon, ChevronDown } from 'lucide-react'
import { usePathSegments } from '@/utils/hooks/usePathSegments';
import useNavbarUIContext from '@/utils/hooks/context/useNavbarUIContext';
import useProjectsDataContext from '@/utils/hooks/context/useProjectDataProvider';
import ProjectLink from '../styledElements/ProjectLink';
import { BouncingDots } from '../styledElements/LoadingElements';
import CreateProjectForm from './pages/projects/CreateProjectForm';

export const Navbar = () => {
  const { isSidebarOpen, toggleSidebar, isCreateProjectFormOpen, toggleCreateProjectForm } = useNavbarUIContext();
  const { projects, loading } = useProjectsDataContext()

  const [isUnfavoritedProjectsCollapsed, setIsUnfavoritedProjectsCollapsed] = useState(false)
  const [isFavoritedProjectsCollapsed, setIsFavoritedProjectsCollapsed] = useState(false)

  const favoritedProjects = projects?.filter(project => project.favorited === true)
  const unfavoritedProjects = projects?.filter(project => project.favorited === false)

  if (!favoritedProjects || !unfavoritedProjects) {
    return null
  }

  const toggleUnfavoritedProjectsTab = () => {
    setIsUnfavoritedProjectsCollapsed(!isUnfavoritedProjectsCollapsed)
  }

  const toggleFavoritedProjectsTab = () => {
    setIsFavoritedProjectsCollapsed(!isFavoritedProjectsCollapsed)
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
          {/* Favorited Projects */}
          {favoritedProjects.length ? (
            <div className={`pt-3 pb-3`}>
              <div className='flex items-center gap-1 ml-5'>
                <button className={`flex items-center justify-center rounded-sm w-3.5 h-3.5 hover:scale-125 ${isFavoritedProjectsCollapsed ? '-rotate-90' : `rotate-0`} duration-500 ease-in-out transition-transform`} onClick={toggleFavoritedProjectsTab}>
                  <ChevronDown size={16} strokeWidth={4} className='text-secondary-text hover:text-primary-text' />
                </button>

                <h1 className='font-semibold text-primary-text'>Favorited</h1>
              </div>

              <div className='flex flex-col w-full'>
                <div className='w-full'>
                  {!isFavoritedProjectsCollapsed &&
                    favoritedProjects.map((project) => (
                      <ProjectLink key={project.id} projectID={project.id} name={project.name} defaultView={project.defaultView} status={project.status}/>
                    ))
                  }
                </div>

                <div className={`w-[80%] h-[1.5px] self-center mt-1 bg-secondary-text`} />
              </div>
            </div>
          ) : (
            <div />
          )}

          {/* Unfavorited Projects */}
          <div className='flex flex-col pb-3 pt-3'>
            <div className='flex items-center gap-1 ml-5'>
              <button className={`flex items-center justify-center rounded-sm w-3.5 h-3.5 hover:scale-125 ${!unfavoritedProjects.length ? '' : isUnfavoritedProjectsCollapsed ? '-rotate-90' : `rotate-0`} duration-500 ease-in-out transition-transform`} onClick={!unfavoritedProjects.length ? () => {} : toggleUnfavoritedProjectsTab}>
                <ChevronDown size={16} strokeWidth={4} className='text-secondary-text hover:text-primary-text' />
              </button>

              <h1 className='font-semibold text-primary-text'>Projects</h1>
            </div>

            {loading ? (
              <div className='flex flex-col w-full'>
                <div className='ml-10 mt-3 mb-2'>
                  <BouncingDots color={'#D0E8E8'} />
                </div>
                <div className='w-[80%] h-[1.5px] self-center mt-1 bg-secondary-text' />
              </div>
            ) : !unfavoritedProjects.length ? (
              <div className='w-full'>
                <div className='w-full flex flex-col justify-center mt-1 hover:scale-105 transition-transform hover:cursor-pointer group'>
                  <button onClick={() => toggleCreateProjectForm(!isCreateProjectFormOpen)} className='text-xs group-hover:font-semibold text-primary-text group-hover:text-secondary-text'>Create {favoritedProjects.length ? '' : 'First'} Project</button>

                  <div className='border-b w-[80%] self-center mt-1 group-hover:border-secondary-text' />
                </div>
              </div>
            ) : (
              <div className='flex flex-col w-full'>
                <div className='flex flex-col w-full'>
                  {!isUnfavoritedProjectsCollapsed &&
                    unfavoritedProjects.map((project) => (
                      <ProjectLink key={project.id} projectID={project.id} name={project.name} defaultView={project.defaultView} status={project.status} />
                    ))
                  }
                </div>

                <div className={`w-[80%] h-[1.5px] self-center mt-1 bg-secondary-text`} />
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