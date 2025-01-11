'use client'
import { Plus, BadgeCheck, CalendarClock, ChevronDown, UserRoundSearch } from "lucide-react"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import { useParams } from "next/navigation";
import DatePickerField from "@/components/styledElements/DatePickerField";
import StatusButton from "@/components/styledElements/StatusButton";
import PriorityButton from "@/components/styledElements/PriorityButton";

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
      <div className={`grid grid-cols-10 grid-rows-1 border-b-2 border-undertone gap-2 h-10 transition-all duration-300`}>
        <div className={`flex col-span-4 border-r-2 border-undertone`}>
          <button className="mr-1 ml-5"><BadgeCheck size={22} color="green" /></button>
          <AutoResizingInput initialWidth={440} maxGrowthWidth={440} placeholder="Name" initialText={taskName} textStyles="text-sm" onConfirmChange={(newName) => updateTaskDatabase(task, project, 'name', newName)} />
        </div>

        <div className={`flex items-center gap-2 border-r-2 border-undertone col-span-2 group`}>
          <button className={`pl-1 ${task.dueDate ? 'text-primary-text' : 'text-secondary-text'}`}><CalendarClock size={18} /></button>
          <DatePickerField datePickerStyles={`w-[50%] text-sm border-b-2 border-secondary-text bg-secondary text-primary-text hover:cursor-pointer group-hover:scale-[1.05] transition-transform`} selectedDate={task.dueDate} onDateChange={(newDate) => { if (newDate) { updateTaskDatabase(task, project, 'dueDate', newDate) } else { console.error('Invalid date selected: null') } }} />
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