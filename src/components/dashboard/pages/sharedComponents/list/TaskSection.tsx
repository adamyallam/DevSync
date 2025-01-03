'use client'
import { ChevronDown, Plus } from "lucide-react"
import { useState } from "react"

//component imports
import ProjectTask from '@/components/dashboard/pages/projects/list/ProjectTask'
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"

interface Props {
  isFirstSection: boolean
  sectionTitle: string
}

export const TaskSection: React.FC<Props> = ( {isFirstSection = false, sectionTitle} ) => {
  const [tasks, setTasks] = useState<JSX.Element[]>([]);

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
        <AutoResizingInput initialWidth={115} initialText={sectionTitle}/>
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