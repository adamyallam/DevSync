'use client'
import { ChevronDown, Plus } from "lucide-react"

//component imports
import ProjectTask from '@/components/dashboard/pages/projects/list/ProjectTask'
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"

export const TaskSection = () => {

  return (
    <div className="mt-6">
      <div className="flex gap-2 ml-8 mt-2 mb-2">
        <button><ChevronDown size={16} className=""/></button>
        <AutoResizingInput placeholder="Untitled Section"/>
        <button className=""><Plus size={16}/></button>
      </div>

      <div>
        <ProjectTask showTopBorder={true} showAddTask={false}/>
        <ProjectTask showTopBorder={false} showAddTask={false}/>
        <ProjectTask showTopBorder={false} showAddTask={false}/>
        <ProjectTask showTopBorder={false} showAddTask={false}/>
        <ProjectTask showTopBorder={false} showAddTask={false}/>
        <ProjectTask showTopBorder={false} showAddTask={false}/>
        <ProjectTask showTopBorder={false} showAddTask={false}/>
        <ProjectTask showTopBorder={false} showAddTask={false}/>
        <ProjectTask showTopBorder={false} showAddTask={false}/>
        <ProjectTask showTopBorder={false} showAddTask={false}/>
        <ProjectTask showTopBorder={false} showAddTask={false}/>
        <ProjectTask showTopBorder={false} showAddTask={false}/>
        <ProjectTask showTopBorder={false} showAddTask={false}/>
        <ProjectTask showTopBorder={false} showAddTask={true}/>
      </div>
    </div>
  )
}

export default TaskSection