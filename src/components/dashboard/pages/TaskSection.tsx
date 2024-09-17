'use client'
import { ChevronDown, Plus } from "lucide-react"
import { usePathSegments } from "@/utils/hooks/usePathSegments"
import { useState } from "react"

//component imports
import ProjectTask from '@/components/dashboard/pages/projects/list/ProjectTask'
import MyTask from "./tasks/list/MyTask"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"

export const TaskSection = () => {
  const [tasks, setTasks] = useState<JSX.Element[]>([])
  const [isFirstTask, setIsFirstTask] = useState<boolean>(false)

  const currentPath = usePathSegments(2);

  function addTask() {
    const newTask = (() => {
      if (currentPath === 'projects/list') {
        return <ProjectTask key={tasks.length} showTopBorder={!isFirstTask} />
      } else if (currentPath === 'tasks/list') {
        return <MyTask key={tasks.length} showTopBorder={!isFirstTask} />
      } else {
        throw new Error('Invalid path for adding a task.')
      }
    })();

    setTasks((prevTasks) => {
      if (!isFirstTask) {
        setIsFirstTask(true)
      }
      return [...prevTasks, newTask]
    })
  }

  return (
    <div className="mt-6">
      <div className="flex gap-2 ml-8 mt-2 mb-2">
        <button><ChevronDown size={16} className=""/></button>
        <AutoResizingInput placeholder="Untitled Section"/>
        <button className=""><Plus size={16}/></button>
      </div>

      <div>
        {tasks}
      </div>

      <button className="ml-12 mt-2 text-sm" onClick={() => addTask()}>Add task...</button>
    </div>
  )
}

export default TaskSection