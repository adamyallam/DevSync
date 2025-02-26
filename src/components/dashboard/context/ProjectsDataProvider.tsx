'use client'
import React, { createContext, useState, useEffect } from 'react';
import { Status, Priority } from '@prisma/client';
import { useSession } from 'next-auth/react';

export type Task = { id: number; sectionID: number, name: string | null; description: string | null; status: Status | null; priority: Priority | null, completed: boolean, dueDate: Date | null; createdAt: Date; updatedAt: Date; };
export type Section = { id: number; tasks: Task[], name: string | null; description: string | null; status: Status | null; dueDate: Date | null; createdAt: Date; updatedAt: Date; };
export type Project = { id: number; sections: Section[], tasks: Task[], name: string; descriptionTitle: string; description: string; defaultView: string; status: Status; favorited: boolean };

type ProjectsContextType = {
  projects: Project[] | null;
  loading: boolean;
  addProject: (project: Project) => void;
  removeProject: (projectId: number) => void
  updateProjectState: (projectId: number, updates: Partial<{ sections: Section[], tasks: Task[], name: string; description: string, descriptionTitle: string, favorited: boolean, status: Status }>) => void;
  updateProjectDatabase: (project: Project | null, property: keyof Project, newValue: string | Status | boolean) => void;
  updateSectionDatabase: (section: Section | null, project: Project | null, property: keyof Section, newValue: string | Status | boolean) => void;
  updateTaskDatabase: (task: Task | null, project: Project | null, property: keyof Task, newValue: string | Status | boolean | Date) => void;
  showError: (setDisplayError: (value: boolean) => void, timeoutRef: React.MutableRefObject<number | null>) => void;
  exitError: (setDisplayError: (value: boolean) => void, timeoutRef: React.MutableRefObject<number | null>) => void;
};

export const ProjectsDataContext = createContext<ProjectsContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode
}

export const ProjectsDataProvider: React.FC<Props> = ({ children }) => {
  const { data: session } = useSession()
  const isDemo = session?.isDemo

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemo) {
      // Load demo projects locally
      const demoProjects: Project[] = [];
      setProjects(demoProjects);
      setLoading(false);
    } else {
      const fetchProjects = async () => {
        try {
          const res = await fetch("/api/project");
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
    }
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

  const removeProject = (projectId: number) => {
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
  }

  const updateProjectState = (projectId: number, updates: Partial<{ sections: Section[], tasks: Task[], name: string; description: string, descriptionTitle: string, favorited: boolean, status: Status, priority: Priority }>) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
  };

  const updateProjectDatabase = async (project: Project | null, property: keyof Project, newValue: string | Status | boolean | Date) => {
    if (!project || newValue === project[property]) return;

    try {
      const res = await fetch(`/api/project`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: project.id,
          [property]: newValue,
        }),
      });

      if (!res.ok) { throw new Error('Failed to update project') }

      await updateProjectState(project.id, { [property]: newValue });
    } catch (err) {
      console.error(`Error updating project ${property}`);
      throw err
    }
  };

  const updateSectionDatabase = async (section: Section | null, project: Project | null, property: keyof Section, newValue: string | Status | boolean) => {
    if (!section || newValue === section[property] || !project) return;

    try {
      const res = await fetch(`/api/section`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: section.id,
          [property]: newValue,
        }),
      });

      if (!res.ok) { throw new Error('Failed to update section') }

      await updateProjectState(project.id, { sections: project.sections.map((s) => s.id === section.id ? { ...s, [property]: newValue } : s), });
    } catch (err) {
      console.error(`Error updating section ${property}`);
      throw err
    }
  }

  const updateTaskDatabase = async (task: Task | null, project: Project | null, property: keyof Task, newValue: string | Status | Priority | boolean | Date) => {
    if (!task || newValue === task[property] || !project) return;

    const updates: Partial<Task> = { [property]: newValue };

    if (property === "completed") {
      const completedValue = newValue as boolean;
      updates.status = completedValue ? "Complete" : "SetStatus";
    } else if (property === "status") {
      const statusValue = newValue as Status;
      updates.completed = statusValue === "Complete";
    }

    try {
      const res = await fetch(`/api/task`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: task.id,
          ...updates
        }),
      });

      if (!res.ok) { throw new Error('Failed to update task') }

      await updateProjectState(project.id, { tasks: project.tasks.map((t) => t.id === task.id ? { ...t, ...updates } : t), });
    } catch (err) {
      console.error(`Error updating task ${property}`);
      throw err
    }
  }

  return (
    <ProjectsDataContext.Provider value={{ projects, loading, addProject, removeProject, updateProjectDatabase, updateSectionDatabase, updateTaskDatabase, showError, exitError, updateProjectState }}>
      {children}
    </ProjectsDataContext.Provider>
  );
};