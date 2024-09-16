'use client'
import { ChevronDown, Plus } from "lucide-react"

//component imports
import Task from '@/components/dashboard/pages/projects/list/Task'
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"

export const TaskSection = () => {

  return (
    <div className="h-full">
      <div className="flex gap-2 ml-8 mt-2 mb-2">
        <button><ChevronDown size={16} className=""/></button>
        <AutoResizingInput placeholder="Untitled Section"/>
        <button className=""><Plus size={16}/></button>
      </div>

      <div className="pb-10">
        <Task showTopBorder={true} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={false}/>
        <Task showTopBorder={false} showAddTask={true}/>
      </div>
    </div>
  )
}

export default TaskSection