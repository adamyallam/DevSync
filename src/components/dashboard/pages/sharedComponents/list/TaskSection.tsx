'use client'
import { ChevronDown, Plus } from "lucide-react"
import { useState } from "react"
import ProjectTask from '@/components/dashboard/pages/projects/list/ProjectTask'
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider"
import { useParams } from "next/navigation"

interface Props {
  isFirstSection: boolean
  sectionTitle: string
  sectionId: number
}

export const TaskSection: React.FC<Props> = ( {isFirstSection = false, sectionId, sectionTitle} ) => {
  const {projects, updateSectionDatabase} = useProjectsDataContext()
  const { id } = useParams<{id: string}>()
  const [tasks, setTasks] = useState<JSX.Element[]>([]);

  const project = projects?.find((project) => project.id.toString() === id);
  const section = project?.sections?.find((section) => section.id === sectionId);

  if (!project || !section) {
    return null
  }

  function addTask() {
    const newTask = <ProjectTask key={tasks.length} />
    setTasks((prevTasks) => {
      return [...prevTasks, newTask]
    })
  }

  if (tasks.length === 0 && isFirstSection) { 
    addTask();
  }

  return (
    <div className="mt-6 w-full">
      <div className="flex ml-8 mt-2 mb-2">
        <button className="text-secondary-text"><ChevronDown size={18}/></button>
        <AutoResizingInput initialWidth={115} initialText={sectionTitle} placeholder="Untitled Section" onConfirmChange={(newName) => updateSectionDatabase(section, project, 'name', newName)}/>
        <button className="text-secondary-text ml-0.5"><Plus size={16} strokeWidth={3}/></button>
      </div>

      <div className="w-[96%] ml-8 border-undertone border-t-2">
        {tasks}
      </div>

      <button onClick={() => addTask()} className="ml-12 mt-2 text-sm text-primary-text">Add task...</button>
    </div>
  )
}

export default TaskSection