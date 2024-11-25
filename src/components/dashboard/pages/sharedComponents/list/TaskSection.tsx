'use client'
import { ChevronDown, Plus } from "lucide-react"
import { usePathSegments } from "@/utils/hooks/usePathSegments"
import { useState } from "react"

//component imports
import ProjectTask from '@/components/dashboard/pages/projects/list/ProjectTask'
import UserTask from "@/components/dashboard/pages/tasks/list/UserTask"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"

interface Props {
  isFirstSection: boolean
}

export const TaskSection: React.FC<Props> = ( {isFirstSection = false} ) => {
  const currentPath = usePathSegments(2);
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
      <div className="flex gap-1 ml-8 mt-2 mb-2">
        <button><ChevronDown size={16} className=""/></button>
        <AutoResizingInput placeholder="Untitled Section"/>
        <button className=""><Plus size={16}/></button>
      </div>

      <div className="w-[96%] ml-8 border-gray-300 border-t-2">
        {tasks}
      </div>

      <button onClick={() => addTask()} className="ml-12 mt-2 text-sm">Add task...</button>
    </div>
  )
}

export default TaskSection