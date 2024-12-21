'use client'
import React, { createContext, useState, useEffect } from 'react';
import { Status } from '@prisma/client';

type Project = { id: number; name: string; descriptionTitle: string; description: string; defaultView: string; status: Status; favorited: boolean };

type ProjectsContextType = {
  projects: Project[] | null;
  loading: boolean;
  addProject: (project: Project) => void;
  updateProjectProperty: (project: Project | null, property: keyof Project, newValue: string | Status | boolean) => void;
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

  const updateProject = (projectId: number, updates: Partial<{ name: string; description: string, descriptionTitle: string, favorited: boolean, status: Status }>) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
  };

  const updateProjectProperty = async (project: Project | null, property: keyof Project, newValue: string | Status | boolean) => {
    if (!project || newValue === project[property]) return;

    try {
      const res = await fetch(`http://localhost:3000/api/project`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: project.id,
          [property]: newValue,
        }),
      });

      if (!res.ok) { throw new Error('Failed to update project') }

      updateProject(project.id, { [property]: newValue });
      console.log(`Project ${property} updated, new ${property}:`, newValue);
    } catch (err) {
      console.error(`Error updating project ${property}`);
      throw err
    }
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
    <ProjectsDataContext.Provider value={{ projects, loading, addProject, updateProjectProperty }}>
      {children}
    </ProjectsDataContext.Provider>
  );
};