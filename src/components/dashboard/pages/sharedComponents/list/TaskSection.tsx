'use client'
import { ChevronDown, Plus } from "lucide-react"
import ProjectTask from '@/components/dashboard/pages/projects/list/ProjectTask'
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider"
import { useParams } from "next/navigation"
import { useState, useRef } from "react"
import ErrorMessage from "@/components/styledElements/ErrorMessage"

interface Props {
  sectionTitle: string
  sectionId: number
}

export const TaskSection: React.FC<Props> = ({ sectionId, sectionTitle }) => {
  const { projects, updateSectionDatabase, updateProjectState, showError, exitError } = useProjectsDataContext()
  const { id } = useParams<{ id: string }>()

  const project = projects?.find((project) => project.id.toString() === id);
  const section = project?.sections?.find((section) => section.id === sectionId);
  const tasks = project?.tasks?.filter((task) => task.sectionID === sectionId);

  const [displayError, setDisplayError] = useState(false)
  const errorTimeoutRef = useRef<number | null>(null);

  if (!project || !section) {
    return <div className='mt-5 ml-8 text-2xl'>Can't retrieve data</div>;
  }

  const createTask = async () => {

    try {
      const res = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectID: project.id, sectionID: section.id })
      });

      if (!res.ok) { throw new Error('Failed to update project') }

      const result = await res.json();

      updateProjectState(project.id, { tasks: [...project.tasks, result.task] });
      console.log("Task Created:", result.task);
    } catch (error) {
      showError(setDisplayError, errorTimeoutRef)
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="mt-6 w-full">
      <div className="flex ml-8 mt-2 mb-2">
        <button className="text-secondary-text"><ChevronDown size={18} /></button>
        <AutoResizingInput initialWidth={115} initialText={sectionTitle} placeholder="Untitled Section" onConfirmChange={(newName) => updateSectionDatabase(section, project, 'name', newName)} />
        <button className="text-secondary-text ml-0.5"><Plus size={16} strokeWidth={3} /></button>
      </div>
      {tasks ? (
        <div className="w-[96%] ml-8 border-undertone border-t-2">
          {tasks.map((task) => (
            <ProjectTask key={String(task.id)} taskId={task.id} taskName={task.name || ''} />
          ))}
        </div>
      ) : (
        <div className="w-[96%] ml-8 border-undertone border-t-2"></div>
      )}

      <div className="flex items-center">
        <button onClick={createTask} className="ml-12 mt-2 text-sm text-secondary-text font-semibold opacity-70 hover:opacity-100 hover:scale-105 transition-transform">Add task...</button>
        <div className="mt-2 ml-3">
          <ErrorMessage arrowDirection={'left'} displayError={displayError} exitError={() => exitError(setDisplayError, errorTimeoutRef)} />
        </div>
      </div>
    </div>
  )
}

export default TaskSection