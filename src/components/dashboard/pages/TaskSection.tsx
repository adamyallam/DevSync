'use client'
import { ChevronDown, Plus } from "lucide-react"
import { usePathSegments } from "@/utils/hooks/usePathSegments"
import { useState, useEffect } from "react"

//component imports
import ProjectTask from '@/components/dashboard/pages/projects/list/ProjectTask'
import MyTask from "./tasks/list/MyTask"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"

export const TaskSection = () => {
  const currentPath = usePathSegments(2);
  const [isFirstTask, setIsFirstTask] = useState<boolean>(true)
  const [tasks, setTasks] = useState<JSX.Element[]>([])

  useEffect(() => {
      setTasks(() => {
    return [newTask()]
  })
  }, [])
  
  useEffect(() => {
    setIsFirstTask(tasks.length === 0)
  }, [tasks])

  function newTask() {
    if (currentPath === 'projects/list') {
      return <ProjectTask key={tasks.length} showTopBorder={isFirstTask} />
    } else if (currentPath === 'tasks/list') {
      return <MyTask key={tasks.length} showTopBorder={isFirstTask} />
    } else {
      throw new Error('Invalid path for adding a task.')
    }
  };

  function addTask() {
    setTasks((prevTasks) => {
      return [...prevTasks, newTask()]
    })
  }

  return (
    <div className="mt-6">
      <div className="flex gap-1 ml-8 mt-2 mb-2">
        <button><ChevronDown size={16} className=""/></button>
        <AutoResizingInput placeholder="Untitled Section"/>
        <button className=""><Plus size={16}/></button>
      </div>

      <div>
        {tasks}
      </div>

      <button onClick={() => addTask()} className="ml-12 mt-2 text-sm">Add task...</button>
    </div>
  )
}

export default TaskSection