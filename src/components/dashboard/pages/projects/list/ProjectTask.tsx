'use client'
import { Check, CalendarClock, ChevronRight, Plus, CircleMinus, CircleCheck, CircleX, CirclePlus, Ellipsis } from "lucide-react"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import { useParams } from "next/navigation";
import DatePickerField from "@/components/styledElements/DatePickerField";
import StatusButton from "@/components/styledElements/StatusButton";
import PriorityButton from "@/components/styledElements/PriorityButton";
import { useState, useEffect, useRef } from "react";
import useNavbarUIContext from "@/utils/hooks/context/useNavbarUIContext";

interface Props {
  taskName: string,
  taskId: number,
  createTask: () => void,
  focusTask?: boolean
}

export const ProjectTask: React.FC<Props> = ({ taskName, taskId, createTask, focusTask }) => {
  const { projects, updateTaskDatabase, updateProjectState } = useProjectsDataContext()
  const { id } = useParams<{ id: string }>()

  const [taskMenuOpen, setTaskMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const ellipsisButtonRef = useRef<HTMLButtonElement>(null);

  const project = projects?.find((project) => project.id.toString() === id);
  const task = project?.tasks?.find((task) => task.id === taskId);

  if (!project || !task) {
    return <div className='mt-5 ml-8 text-2xl'>No task found</div>;
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && ellipsisButtonRef.current && !ellipsisButtonRef.current.contains(event.target as Node)) {
        setTaskMenuOpen(false);
      }
    };
    if (taskMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [taskMenuOpen]);

  const deleteTask = async () => {

    try {
      const res = await fetch(`http://localhost:3000/api/task`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId }),
      });

      if (!res.ok) { throw new Error('Failed to update task') }

      await updateProjectState(project.id, { tasks: project.tasks.filter((t) => t.id !== taskId) })
    } catch (err) {
      console.error(`Error deleting task ${taskId}`);
      throw err
    }
  }

  return (
    <div className={`grid grid-cols-10 grid-rows-1 border-b-2 border-undertone gap-2 h-10 hover:bg-selected group`}>
      <div className={`flex col-span-4 border-r-2 border-undertone`}>
        <button onClick={() => updateTaskDatabase(task, project, 'completed', !task.completed)} className="mr-1 ml-5 hover:scale-110 transition-transform">
          <div className={`flex items-center justify-center w-[19px] h-[19px] border-2 rounded-full border-green-700 ${task.completed ? 'bg-green-600' : ''} transition-colors`}><Check className="ml-[1px] mt-[1px]" size={10} strokeWidth={3} color="white" /></div>
        </button>

        <AutoResizingInput focusInput={focusTask} initialWidth={150} maxGrowthWidth={444} placeholder="Name" initialText={taskName} textStyles="text-sm" onConfirmChange={(newName) => updateTaskDatabase(task, project, 'name', newName)} />
      </div>

      <div className={`flex items-center gap-2 border-r-2 border-undertone col-span-2 group`}>
        <button className={`pl-1 ${task.dueDate ? 'text-primary-text' : 'text-secondary-text'}`}><CalendarClock size={18} /></button>
        <DatePickerField datePickerStyles={`w-[50%] px-1 text-sm bg-secondary group-hover:bg-selected text-primary-text hover:cursor-pointer outline-none hover:outline hover:outline-2 hover:outline-primary focus:outline focus:outline-2 focus:outline-secondary-text rounded-sm`} dateFormat="MMMM d" selectedDate={task.dueDate} onDateChange={(newDate) => { if (newDate) { updateTaskDatabase(task, project, 'dueDate', newDate) } else { console.error('Invalid date selected: null') } }} />
      </div>

      <div className="w-full flex items-center border-r-2 border-undertone col-span-2">
        <PriorityButton project={project} task={task} priority={task.priority || 'No Priority'} />
      </div>

      <div className={`relative w-full flex items-center col-span-2`}>
        <StatusButton project={project} task={task} model="task" status={task.status || 'No Status'} />
        <button ref={ellipsisButtonRef} onClick={() => setTaskMenuOpen((prev) => !prev)} className="text-secondary-text hover:text-primary-text hover:scale-110 transition-transform mr-2"><Ellipsis size={20} strokeWidth={2.5} /></button>
        {taskMenuOpen && (
          <div ref={menuRef} className="absolute z-50 bg-primary border-2 border-undertone rounded-md top-[30px] right-0">
            <div className="flex flex-col items-start w-full h-full">
              <div className="border-b-2 border-undertone w-full h-full">
                <div className="w-full flex items-center justify-between text-primary-text p-2 text-sm hover:bg-selected">
                  <button onClick={() => { updateTaskDatabase(task, project, 'completed', !task.completed), setTaskMenuOpen((prev) => !prev) }} className="flex items-center gap-1 text-xs">
                    {task.completed ? (
                      <CircleX size={15} strokeWidth={2} />
                    ) : (
                      <CircleCheck size={15} strokeWidth={2} />
                    )}
                    Mark {task.completed ? 'Incomplete' : 'Complete'}
                  </button>
                </div>
              </div>

              <div className="w-full h-full flex flex-col items-start">
                <button onClick={() => { createTask(), setTaskMenuOpen((prev) => !prev) }} className="w-full h-full flex items-center gap-1 text-primary-text text-xs hover:bg-selected p-2"><CirclePlus size={15} strokeWidth={2} /> Add task</button>
                <button onClick={()=> {deleteTask(), setTaskMenuOpen((prev) => !prev)}} className="w-full h-full flex items-center gap-1 text-primary-text text-xs hover:bg-selected p-2"><CircleMinus size={15} strokeWidth={2} />Delete task</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectTask