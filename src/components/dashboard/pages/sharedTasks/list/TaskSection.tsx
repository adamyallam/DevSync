'use client'
import { ChevronDown, Plus } from "lucide-react"
import { usePathSegments } from "@/utils/hooks/usePathSegments"
import { useState, useEffect } from "react"

//component imports
import ProjectTask from '@/components/dashboard/pages/projects/list/ProjectTask'
import MyTask from "@/components/dashboard/pages/tasks/list/MyTask"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"

interface Props {
  hasInitialTask: boolean;
}

export const TaskSection: React.FC<Props> = ({hasInitialTask}) => {
  const currentPath = usePathSegments(2);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isFirstTask, setIsFirstTask] = useState<boolean>(true);
  const [tasks, setTasks] = useState<JSX.Element[]>([]);

  function newTask() {
    if (currentPath === 'projects/list') {
      return <ProjectTask key={tasks.length + 1} showTopBorder={isFirstTask} />
    } else if (currentPath === 'tasks/list') {
      return <MyTask key={tasks.length + 1} showTopBorder={isFirstTask} />
    } else {
      throw new Error('Invalid path for adding a task.')
    }
  };

  function addTask() {
    setTasks((prevTasks) => {
      return [...prevTasks, newTask()]
    })
  }


  useEffect(() => {
    if (hasInitialTask) {
      addTask()
      setInitialized(true);
    } else {
      setInitialized(true);
    }
  }, [hasInitialTask]);


  useEffect(() => {
    if (initialized) {
      setIsFirstTask(tasks.length === 0);
    }
  }, [tasks, initialized]);

  
  if (!initialized) {
    return null
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