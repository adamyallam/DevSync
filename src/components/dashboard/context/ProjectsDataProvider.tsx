'use client'
import React, { createContext, useState, useEffect } from 'react';
import { Status } from '@prisma/client';

type Project = { id: number; name: string; descriptionTitle: string; description: string; defaultView: string; status: Status; favorited: boolean };

type ProjectsContextType = {
  projects: Project[] | null;
  loading: boolean;
  addProject: (project: Project) => void;
  updateProject: (projectId: number, updates: Partial<{ name: string; description: string, descriptionTitle: string, status: Status }>) => void
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

  const updateProject = (projectId: number, updates: Partial<{ name: string; description: string, descriptionTitle: string, status: Status }>) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, ...updates } : project
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
    <ProjectsDataContext.Provider value={{ projects, loading, addProject, updateProject }}>
      {children}
    </ProjectsDataContext.Provider>
  );
};