'use client'
import React, { createContext, useState, useEffect } from 'react';
import { Status } from '@prisma/client';

type Task = { id: number; sectionID: number, name: string | null; description: string | null; status: Status | null; dueDate: Date | null; createdAt: Date; updatedAt: Date; };
type Section = { id: number; tasks: Task[], name: string | null; description: string | null; status: Status | null; dueDate: Date | null; createdAt: Date; updatedAt: Date; };
type Project = { id: number; sections: Section[], tasks: Task[], name: string; descriptionTitle: string; description: string; defaultView: string; status: Status; favorited: boolean };

type ProjectsContextType = {
  projects: Project[] | null;
  loading: boolean;
  addProject: (project: Project) => void;
  updateProjectState: (projectId: number, updates: Partial<{ sections: Section[], tasks: Task[], name: string; description: string, descriptionTitle: string, favorited: boolean, status: Status }>) => void;
  updateProjectDatabase: (project: Project | null, property: keyof Project, newValue: string | Status | boolean) => void;
  updateSectionDatabase: (section: Section | null, project: Project | null, property: keyof Section, newValue: string | Status | boolean) => void;
  updateTaskDatabase: (task: Task | null, project: Project | null, property: keyof Task, newValue: string | Status | boolean) => void;
  showError: (setDisplayError: (value: boolean) => void, timeoutRef: React.MutableRefObject<number | null>) => void;
  exitError: (setDisplayError: (value: boolean) => void, timeoutRef: React.MutableRefObject<number | null>) => void;
};

export const ProjectsDataContext = createContext<ProjectsContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode
}

export const ProjectsDataProvider: React.FC<Props> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true);

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

  const showError = (setDisplayError: (value: boolean) => void, timeoutRef: React.MutableRefObject<number | null>) => {
    console.log('Failed to update')
    setDisplayError(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setDisplayError(false)
    }, 5000);
  }

  const exitError = (setDisplayError: (value: boolean) => void, timeoutRef: React.MutableRefObject<number | null>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setDisplayError(false)
  }

  const addProject = (project: Project) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };

  const updateProjectState = (projectId: number, updates: Partial<{ sections: Section[], tasks: Task[], name: string; description: string, descriptionTitle: string, favorited: boolean, status: Status }>) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
  };

  const updateProjectDatabase = async (project: Project | null, property: keyof Project, newValue: string | Status | boolean) => {
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

      updateProjectState(project.id, { [property]: newValue });
    } catch (err) {
      console.error(`Error updating project ${property}`);
      throw err
    }
  };

  const updateSectionDatabase = async (section: Section | null, project: Project | null, property: keyof Section, newValue: string | Status | boolean) => {
    if (!section || newValue === section[property] || !project) return;

    try {
      const res = await fetch(`http://localhost:3000/api/section`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: section.id,
          [property]: newValue,
        }),
      });

      if (!res.ok) { throw new Error('Failed to update section') }

      updateProjectState(project.id, { sections: project.sections.map((s) => s.id === section.id ? { ...s, [property]: newValue } : s), });
    } catch (err) {
      console.error(`Error updating section ${property}`);
      throw err
    }
  }

  const updateTaskDatabase = async (task: Task | null, project: Project | null, property: keyof Task, newValue: string | Status | boolean) => {
    if (!task || newValue === task[property] || !project) return;

    try {
      const res = await fetch(`http://localhost:3000/api/task`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: task.id,
          [property]: newValue,
        }),
      });

      if (!res.ok) { throw new Error('Failed to update task') }

      updateProjectState(project.id, { tasks: project.tasks.map((t) => t.id === task.id ? { ...t, [property]: newValue } : t), });
    } catch (err) {
      console.error(`Error updating task ${property}`);
      throw err
    }
  }

  return (
    <ProjectsDataContext.Provider value={{ projects, loading, addProject, updateProjectDatabase, updateSectionDatabase, updateTaskDatabase, showError, exitError, updateProjectState }}>
      {children}
    </ProjectsDataContext.Provider>
  );
};