'use client'
import { Plus, BadgeCheck, CalendarClock, ChevronDown, UserRoundSearch } from "lucide-react"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import { useParams } from "next/navigation";

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
    return <div className='mt-5 ml-8 text-2xl'>Can't retrieve data</div>;
  }

  return (
    <div className="w-full">
      <div className={`grid grid-cols-10 grid-rows-1 border-b-2 border-undertone gap-2 h-10 transition-all duration-300`}>
        <div className={`flex col-span-4 border-r-2 border-undertone`}>
          <button className="mr-1 ml-5"><BadgeCheck size={22} color="green" /></button>
          <AutoResizingInput initialWidth={440} maxGrowthWidth={440} placeholder="Name" initialText={taskName} textStyles="text-sm" onConfirmChange={(newName) => updateTaskDatabase(task, project, 'name', newName)} />
        </div>

        <div className={`flex items-center justify-between border-r-2 border-undertone col-span-2`}>
          <button className="w-full pl-1 text-primary-text"><UserRoundSearch size={22} /></button>
          <button className="pr-2 text-secondary-text"><Plus size={18} /></button>
        </div>

        <div className={`flex border-r-2 border-undertone col-span-2`}>
          <button className="w-full pl-1 text-primary-text"><CalendarClock size={22} /></button>
        </div>

        <div className="self-center col-span-2">
          <button className="flex items-center gap-1 text-primary-text"><div className="border rounded-full border-secondary-text w-3 h-3 ml-1 mr-1" />High<ChevronDown size={13} className="mt-1 text-secondary-text" /></button>
        </div>
      </div>
    </div>
  )
}

export default ProjectTask