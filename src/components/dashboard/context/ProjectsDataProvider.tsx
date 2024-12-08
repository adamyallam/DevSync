'use client'
import React, { createContext, useState, useEffect } from 'react';

type Project = { id: number; name: string; defaultView: string };

type ProjectsContextType = {
  projects: Project[] | null;
  addProject: (project: Project) => void
};

export const ProjectsDataContext = createContext<ProjectsContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode
}

export const ProjectsDataProvider: React.FC<Props> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([])

  const addProject = (project: Project) => {
    setProjects((prevProjects) => [...prevProjects, project]);
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
      }
    }

    fetchProjects();
  }, [])

  return (
    <ProjectsDataContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectsDataContext.Provider>
  );
};