'use client'
import { Check, CalendarClock, } from "lucide-react"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import { useParams } from "next/navigation";
import DatePickerField from "@/components/styledElements/DatePickerField";
import StatusButton from "@/components/styledElements/StatusButton";
import PriorityButton from "@/components/styledElements/PriorityButton";
import { useState } from "react";

interface Props {
  taskName: string,
  taskId: number
}

export const ProjectTask: React.FC<Props> = ({ taskName, taskId }) => {
  const { projects, updateTaskDatabase } = useProjectsDataContext()
  const { id } = useParams<{ id: string }>()

  const project = projects?.find((project) => project.id.toString() === id);
  const task = project?.tasks?.find((task) => task.id === taskId);

  if (!project || !task) {
    return <div className='mt-5 ml-8 text-2xl'>No task found</div>;
  }

  return (
    <div className="w-full h-full">
      <div className={`grid grid-cols-10 grid-rows-1 border-b-2 border-undertone gap-2 h-10 hover:bg-selected group`}>
        <div className={`flex col-span-4 border-r-2 border-undertone`}>
          <button onClick={() => updateTaskDatabase(task, project, 'completed', !task.completed)} className="mr-1 ml-5 hover:scale-110 transition-transform">
            <div className={`flex items-center justify-center w-[19px] h-[19px] border-2 rounded-full border-green-700 ${task.completed ? 'bg-green-600' : ''} transition-colors`}><Check className="ml-[1px] mt-[1px]" size={10} strokeWidth={3} color="white"/></div>
          </button>

          <AutoResizingInput initialWidth={150} maxGrowthWidth={444} placeholder="Name" initialText={taskName} textStyles="text-sm" onConfirmChange={(newName) => updateTaskDatabase(task, project, 'name', newName)} />
        </div>

        <div className={`flex items-center gap-2 border-r-2 border-undertone col-span-2 group`}>
          <button className={`pl-1 ${task.dueDate ? 'text-primary-text' : 'text-secondary-text'}`}><CalendarClock size={18} /></button>
          <DatePickerField datePickerStyles={`w-[50%] px-1 text-sm bg-secondary group-hover:bg-selected text-primary-text hover:cursor-pointer outline-none hover:outline hover:outline-2 hover:outline-primary focus:outline focus:outline-2 focus:outline-secondary-text rounded-sm`} dateFormat="MMMM d" selectedDate={task.dueDate} onDateChange={(newDate) => { if (newDate) { updateTaskDatabase(task, project, 'dueDate', newDate) } else { console.error('Invalid date selected: null') } }} />
        </div>

        <div className="w-full flex items-center border-r-2 border-undertone col-span-2">
          <PriorityButton project={project} task={task} priority={task.priority || 'No Priority'} />
        </div>

        <div className={`w-full flex items-center col-span-2`}>
          <StatusButton project={project} task={task} model="task" status={task.status || 'No Status'} />
        </div>
      </div>
    </div>
  )
}

export default ProjectTask