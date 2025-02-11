'use client'
import { Check, CircleCheck, CircleX, Ellipsis, CirclePlus, CircleMinus } from "lucide-react"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider"
import useNavbarUIContext from "@/utils/hooks/context/useNavbarUIContext"
import { useParams } from "next/navigation"
import { useState, useRef } from "react"
import useMenuClose from "@/utils/hooks/useMenuClose"
import DatePickerField from "@/components/styledElements/DatePickerField"
import StatusButton from "@/components/styledElements/StatusButton"

interface Props {
  taskName: string,
  taskId: number,
  createTask: () => void,
  focusTask?: boolean
}

export const BoardTask: React.FC<Props> = ({ taskName, taskId, createTask, focusTask }) => {
  const { projects, updateTaskDatabase, updateProjectState } = useProjectsDataContext()
  const { id } = useParams<{ id: string }>()

  const [taskMenuOpen, setTaskMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const ellipsisButtonRef = useRef<HTMLButtonElement>(null);

  useMenuClose(menuRef, ellipsisButtonRef, taskMenuOpen, setTaskMenuOpen)

  const project = projects?.find((project) => project.id.toString() === id);
  const task = project?.tasks?.find((task) => task.id === taskId);

  if (!project || !task) {
    return <div className='mt-5 ml-8 text-2xl'>No task found</div>;
  }

  const deleteTask = async () => {

    try {
      const res = await fetch(`/api/task`, {
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
    <div className="pb-2">
      <div className="flex flex-col justify-evenly border border-undertone rounded-lg w-60 h-24">
        <div className="flex items-center justify-between gap-1">
          <div className="flex">
            <button onClick={() => updateTaskDatabase(task, project, 'completed', !task.completed)} className="ml-3 hover:scale-110 transition-transform">
              <div className={`flex items-center justify-center w-[19px] h-[19px] border-2 rounded-full border-green-700 ${task.completed ? 'bg-green-600' : ''} transition-colors`}><Check className="ml-[1px] mt-[1px]" size={10} strokeWidth={3} color="white" /></div>
            </button>
            <AutoResizingInput focusInput={focusTask} initialWidth={110} maxGrowthWidth={170} placeholder="Name" initialText={taskName} textStyles="text-sm" onConfirmChange={(newName) => updateTaskDatabase(task, project, 'name', newName)} />
          </div>

          <div className="flex flex-col relative items-center">
            <button ref={ellipsisButtonRef} onClick={() => setTaskMenuOpen((prev) => !prev)} className="text-secondary-text hover:text-primary-text hover:scale-110 transition-transform mr-2"><Ellipsis size={20} strokeWidth={2.5} /></button>
            {taskMenuOpen && (
              <div ref={menuRef} className={`absolute z-50 bg-primary border-2 border-undertone rounded-md mt-5 mr-20`} >
                <div className="flex flex-col items-start w-full h-full">
                  <div className="border-b-2 border-undertone w-full h-full">
                    <div className="w-full flex items-center justify-between text-primary-text p-2 text-sm hover:bg-selected">
                      <button onClick={(e) => { updateTaskDatabase(task, project, 'completed', !task.completed), setTaskMenuOpen((prev) => !prev) }} className="flex items-center gap-1 text-xs">
                        {task.completed ? (
                          <CircleX size={15} strokeWidth={2} />
                        ) : (
                          <CircleCheck size={15} strokeWidth={2} />
                        )}
                        Mark {task.completed ? 'Incomplete' : 'Complete'}
                      </button>
                    </div>
                    <button onClick={() => { createTask(), setTaskMenuOpen((prev) => !prev) }} className="w-full h-full flex items-center gap-1 text-primary-text text-xs hover:bg-selected p-2"><CirclePlus size={15} strokeWidth={2} /> Add task</button>
                  </div>
                  <div className="w-full h-full flex flex-col items-start">
                    <button onClick={() => { deleteTask(), setTaskMenuOpen((prev) => !prev) }} className="w-full h-full flex items-center gap-1 text-red-400 text-xs hover:bg-selected p-2 font-semibold"><CircleMinus size={15} strokeWidth={2} />Delete task</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-2 ml-2">
          <DatePickerField datePickerStyles={`w-full px-1 text-sm bg-secondary group-hover:bg-selected text-primary-text hover:cursor-pointer outline-none hover:outline hover:outline-2 hover:outline-primary focus:outline focus:outline-2 focus:outline-secondary-text rounded-sm`} dateFormat="MMMM d" selectedDate={task.dueDate} onDateChange={(newDate) => { if (newDate) { updateTaskDatabase(task, project, 'dueDate', newDate) } else { console.error('Invalid date selected: null') } }} />
          <div className="self-center mr-2">
            <StatusButton project={project} task={task} model="task" status={task.status || 'No Status'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardTask