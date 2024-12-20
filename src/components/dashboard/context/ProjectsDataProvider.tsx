'use client'
import React, { createContext, useState, useEffect } from 'react';
import { Status } from '@prisma/client';

type Project = { id: number; name: string; description: string; defaultView: string; status: Status; favorited: boolean };

type ProjectsContextType = {
  projects: Project[] | null;
  addProject: (project: Project) => void
  loading: boolean
  updateProjectStatus: (projectId: number, newStatus: Status) => void
  updateProjectName: (projectId: number, newName: string) => void
};

export const ProjectsDataContext = createContext<ProjectsContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode
}

export const ProjectsDataProvider: React.FC<Props> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true);

  const addProject = (project: Project) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };

  const updateProjectName = (projectId: number, newName: string) => { 
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, name: newName || project.name } : project
      )
    );
  }

  const updateProjectStatus = (projectId: number, newStatus: Status) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project
      )
    );
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/project");
        const data = await res.json();

        if (data.projects) {
          setProjects(data.projects);
        } else {
          console.error('No projects found')
        }
      } catch (err) {
        return { message: 'failed to get projects', err }
      } finally {
        setLoading(false)
      }
    }

    fetchProjects();
  }, [])

  return (
    <ProjectsDataContext.Provider value={{ projects, loading, addProject, updateProjectStatus, updateProjectName }}>
      {children}
    </ProjectsDataContext.Provider>
  );
};