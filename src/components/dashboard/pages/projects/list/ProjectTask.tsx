'use client'
import { Check, CalendarClock, ChevronRight, Plus, CircleMinus, CircleCheck, CircleX } from "lucide-react"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import { useParams } from "next/navigation";
import DatePickerField from "@/components/styledElements/DatePickerField";
import StatusButton from "@/components/styledElements/StatusButton";
import PriorityButton from "@/components/styledElements/PriorityButton";
import { useState, useEffect, useRef } from "react";

interface Props {
  taskName: string,
  taskId: number,
  createTask: () => void
}

export const ProjectTask: React.FC<Props> = ({ taskName, taskId, createTask }) => {
  const { projects, updateTaskDatabase } = useProjectsDataContext()
  const { id } = useParams<{ id: string }>()

  const [taskMenuOpen, setTaskMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const menuRef = useRef<HTMLDivElement>(null);
  const taskRef = useRef<HTMLDivElement>(null);

  const project = projects?.find((project) => project.id.toString() === id);
  const task = project?.tasks?.find((task) => task.id === taskId);

  if (!project || !task) {
    return <div className='mt-5 ml-8 text-2xl'>No task found</div>;
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && taskRef.current && !taskRef.current.contains(event.target as Node)) {
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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setTaskMenuOpen(true);
    setMenuPosition({ x: e.pageX, y: e.pageY });
  };

  return (
    <div ref={taskRef} className="w-full h-full" onContextMenu={handleContextMenu} onClick={() => setTaskMenuOpen(false)}>
      <div className={`grid grid-cols-10 grid-rows-1 border-b-2 border-undertone gap-2 h-10 hover:bg-selected group`}>
        <div className={`flex col-span-4 border-r-2 border-undertone`}>
          <button onClick={() => updateTaskDatabase(task, project, 'completed', !task.completed)} className="mr-1 ml-5 hover:scale-110 transition-transform">
            <div className={`flex items-center justify-center w-[19px] h-[19px] border-2 rounded-full border-green-700 ${task.completed ? 'bg-green-600' : ''} transition-colors`}><Check className="ml-[1px] mt-[1px]" size={10} strokeWidth={3} color="white" /></div>
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
      {taskMenuOpen && (
        <div ref={menuRef} className="absolute z-50 h-auto w-[10%] bg-primary border-[3px] border-undertone rounded-md" style={{ top: menuPosition.y, left: menuPosition.x }}>
          <div className="flex flex-col items-start w-full h-full">
            <div className="border-b-2 border-undertone w-full h-full group">
              <div className="w-full flex items-center justify-between gap-1 text-primary-text p-2 text-sm hover:bg-selected hover:cursor-pointer">
                <div className="flex items-center gap-2">
                  <Check size={17} strokeWidth={2.5} className="mt-[2px]" />
                  Mark as
                </div>

                <ChevronRight size={18} strokeWidth={2.5} />
              </div>

              <div className="absolute top-0 left-full border-2 rounded-md bg-primary border-undertone w-[90%] hidden group-hover:block">
                <div className="flex flex-col items-start">
                  <button onClick={() => updateTaskDatabase(task, project, 'completed', true)} className="w-full flex items-center gap-1 text-primary-text text-xs p-2 hover:bg-selected"><CircleCheck size={16} strokeWidth={1.5}/> Complete</button>
                  <button onClick={() => updateTaskDatabase(task, project, 'completed', false)} className="w-full flex items-center gap-1 text-primary-text text-xs p-2 hover:bg-selected"><CircleX size={16} strokeWidth={1.5}/> Incomplete</button>
                </div>
              </div>
            </div>

            <div className="w-full h-full flex flex-col items-start">
              <button onClick={createTask} className="w-full h-full flex items-center gap-2 text-primary-text text-sm hover:bg-selected p-2"><Plus size={17} strokeWidth={2.5} /> Add task</button>
              <button className="w-full h-full flex items-center gap-2 text-primary-text text-sm hover:bg-selected p-2"><CircleMinus size={17} strokeWidth={2} />Delete task</button>
            </div>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default ProjectTask