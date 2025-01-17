'use client'
import { useState } from "react"
import { useSession } from 'next-auth/react';
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import { BouncingDots } from "@/components/styledElements/LoadingElements";
import { Check, ChevronDown } from "lucide-react";
import AutoResizingInput from "@/components/styledElements/AutoResizingInput";
import DatePickerField from "@/components/styledElements/DatePickerField";

export const TasksCard = () => {
  const { projects, loading, updateTaskDatabase } = useProjectsDataContext()
  const { data: session } = useSession()

  const [taskView, setTaskView] = useState('Incomplete')
  const [isProjectCollapsed, setIsProjectCollapsed] = useState<Record<string, boolean>>({})

  const userInitials = session ? session?.firstName.trim()[0] + session?.lastName.trim()[0] : 'A'

  const hasIncompleteTasks = projects?.some((project) =>
    project.tasks.some((task) => !task.completed)
  );

  const toggleProjectCollapse = (projectId: number) => {
    setIsProjectCollapsed((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const filteredProjects = projects?.map((project) => ({
    ...project,
    tasks: project.tasks.filter((task) => {
      if (taskView === 'Incomplete') return !task.completed
      if (taskView === 'Upcoming') {
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
        return !task.completed && task.dueDate && new Date(task.dueDate) <= oneWeekFromNow;
      }
      if (taskView === 'Overdue') {
        return !task.completed && task.dueDate && new Date(task.dueDate) < new Date();
      }
      if (taskView === 'Completed') return task.completed;
      return false;
    }),
  })).filter((project) => project.tasks.length > 0);

  if (!projects || !filteredProjects) return null;

  return (
    <div className="w-550 h-96 border-2 border-undertone rounded-lg shadow-sm flex flex-col overflow-hidden">
      <div className="border-b-2 border-undertone sticky top-0 bg-secondary z-10">
        <div className="flex items-center mt-5 ml-12 pb-3">
          <button className="border-2 border-primary-text rounded-full w-10 h-10 p-1 text-lg text-primary-text mr-3 hover:scale-105 hover:border-secondary-text hover:text-secondary-text transition-transform">
            {userInitials}
          </button>

          <div className="flex flex-col gap-2 ml-5 text-primary-text">
            <h1 className="text-lg font-semibold">My Tasks</h1>

            <div className="flex gap-6">
              {[
                { name: 'Incomplete' },
                { name: 'Upcoming' },
                { name: 'Overdue' },
                { name: 'Completed' },
              ].map(({ name }) => (
                <div key={name} className="flex-col ml-1">
                  <div className="flex">
                    <span className="invisible absolute scale-105 font-semibold text-xs">
                      {name}
                    </span>
                    <button onClick={() => setTaskView(name)} className={`${taskView === name ? 'scale-110 font-semibold' : 'hover:scale-110 hover:font-semibold transition-all'} text-xs`}>
                      {name}
                    </button>
                  </div>
                  <div
                    className={`${taskView === name ? 'scale-x-100' : 'scale-x-0'
                      } bg-primary-text w-full h-[2px] translate-y-[13px] transition-transform duration-500`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-5">
        {loading ? (
          <div className="flex justify-center mt-24">
            <BouncingDots color="#DBDADA" size={15} />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center p-5 gap-2">
            <span className="text-primary-text font-semibold">{taskView === 'Completed' ? "You haven't completed any tasks yet!" : `You completed all your ${taskView === 'Upcoming' ? 'upcoming' : ''} ${taskView === 'Overdue' ? 'overdue' : ''} tasks!`}</span>
            <span className="text-primary-text text-sm">{taskView === 'Completed' ? 'When you complete tasks they will show up here' : 'When there are new tasks to complete they will show up here'}</span>
          </div>
        ) : (
          <div>
            {filteredProjects.map((project) => (
              <div key={project.id} className="flex flex-col pb-4">
                <div className="flex gap-1 items-center pb-1">
                  <button onClick={() => toggleProjectCollapse(project.id)} className={`${isProjectCollapsed[project.id] ? '-rotate-90' : 'rotate-0'} hover:scale-110 text-secondary-text hover:text-primary-text duration-500 ease-in-out transition-transform`}>
                    <ChevronDown size={16} strokeWidth={3} />
                  </button>
                  <span className="text-primary-text font-semibold">
                    {project.name}
                  </span>
                </div>

                <div className={`${isProjectCollapsed[project.id] ? 'hidden' : ''} mt-2`}>
                  {project.tasks.map((task, index) => (
                    <div key={task.id} className={`flex flex-col border-t border-undertone w-full ${index === project.tasks.filter((task) => !task.completed).length - 1 ? '' : 'border-b'}`}>
                      <div className="flex gap-2 p-2 items-center justify-between hover:bg-selected group">
                        <div className="flex gap-1">
                          <button onClick={() => updateTaskDatabase(task, project, 'completed', !task.completed)} className="ml-3 hover:scale-110 transition-transform">
                            <div className={`flex items-center justify-center w-[19px] h-[19px] border-2 rounded-full border-green-700 ${task.completed ? 'bg-green-600' : ''} transition-colors`}>
                              <Check className="ml-[1px] mt-[1px]" size={10} strokeWidth={3} color="white" />
                            </div>
                          </button>

                          <span className="text-primary-text text-sm">
                            <AutoResizingInput textStyles="text-sm" initialWidth={150} maxGrowthWidth={275} initialText={task.name || ''} placeholder="Name..." onConfirmChange={(newName) => updateTaskDatabase(task, project, 'name', newName)} />
                          </span>
                        </div>

                        <div>
                          <DatePickerField dateFormat="MMMM d" datePickerStyles="group-hover:bg-selected w-[55%] px-1 text-sm bg-secondary text-primary-text hover:cursor-pointer outline-none hover:outline hover:outline-2 hover:outline-primary focus:outline focus:outline-2 focus:outline-secondary-text rounded-sm" selectedDate={task.dueDate} onDateChange={(newDate) => { if (newDate) { updateTaskDatabase(task, project, 'dueDate', newDate) } else { console.error('Invalid date selected: null') } }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-secondary-text w-full h-[2px] ml-1 mt-[2px]" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


export default TasksCard