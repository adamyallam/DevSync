'use client'
import { ChevronDown, CircleMinus, CirclePlus, Ellipsis, Plus } from "lucide-react"
import ProjectTask from '@/components/dashboard/pages/projects/list/ProjectTask'
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider"
import { useParams } from "next/navigation"
import { useState, useRef } from "react"
import ErrorMessage from "@/components/styledElements/ErrorMessage"
import useMenuClose from "@/utils/hooks/useMenuClose"

interface Props {
  sectionTitle: string
  sectionId: number
  createSection: () => void,
  focusSection?: boolean
}

export const TaskSection: React.FC<Props> = ({ sectionId, sectionTitle, createSection, focusSection }) => {
  const { projects, updateSectionDatabase, updateProjectState, showError, exitError } = useProjectsDataContext()
  const { id } = useParams<{ id: string }>()

  const project = projects?.find((project) => project.id.toString() === id);
  const section = project?.sections?.find((section) => section.id === sectionId);
  const tasks = project?.tasks?.filter((task) => task.sectionID === sectionId);

  const [focusTask, setFocusTask] = useState<boolean>(false);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false)
  const [isSectionOpen, setIsSectionOpen] = useState(true)
  const [displayError, setDisplayError] = useState(false)

  const errorTimeoutRef = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null)
  const sectionMenuButtonRef = useRef<HTMLButtonElement>(null)

  useMenuClose(menuRef, sectionMenuButtonRef, isSectionMenuOpen, setIsSectionMenuOpen)


  if (!project || !section) {
    return <div className='mt-5 ml-8 text-2xl'>Can't retrieve data</div>;
  }

  const deleteSection = async () => {

    try {
      const res = await fetch(`http://localhost:3000/api/section`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sectionId }),
      });

      if (!res.ok) { throw new Error('Failed to update task') }

      await updateProjectState(project.id, { sections: project.sections.filter((s) => s.id !== sectionId) })
      console.log("Task Deleted:", sectionId);
    } catch (err) {
      console.error(`Error deleting task ${sectionId}`);
      throw err
    }
  }

  const createTask = async () => {

    try {
      const res = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectID: project.id, sectionID: section.id })
      });

      if (!res.ok) { throw new Error('Failed to update project') }

      const result = await res.json();

      updateProjectState(project.id, { tasks: [...project.tasks, result.task] });
      setFocusTask(true);
      console.log("Task Created:", result.task);
    } catch (error) {
      showError(setDisplayError, errorTimeoutRef)
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="mt-6 pb-2 w-full">
      <div className="flex ml-8 mt-2 mb-2">
        <button onClick={!tasks?.length ? () => { } : () => setIsSectionOpen((prev) => !prev)} className={`text-secondary-text hover:scale-110 hover:text-primary-text ${!tasks?.length ? '' : isSectionOpen ? 'rotate-0' : '-rotate-90'} duration-300 transition-transform`}><ChevronDown size={18} strokeWidth={3} /></button>

        <AutoResizingInput focusInput={focusSection} initialWidth={115} maxGrowthWidth={1000} initialText={sectionTitle} placeholder="Untitled Section" onConfirmChange={(newName) => updateSectionDatabase(section, project, 'name', newName)} />

        <button onClick={createTask} className="text-secondary-text ml-2 hover:scale-110 hover:text-primary-text transition-transform"><Plus size={16} strokeWidth={3} /></button>

        <div className="relative flex flex-col justify-center ml-2">
          <button ref={sectionMenuButtonRef} onClick={() => setIsSectionMenuOpen((prev) => !prev)} className="text-secondary-text hover:scale-110 hover:text-primary-text transition-transform"><Ellipsis size={16} strokeWidth={3} /></button>

          {isSectionMenuOpen && (
            <div ref={menuRef} className="absolute flex flex-col top-full bg-primary border-2 border-undertone rounded-md w-40 z-50">
              <div className="border-b-2 border-undertone w-full">
                <button onClick={!tasks?.length ? () => { createTask(), setIsSectionMenuOpen((prev) => !prev) } : () => { setIsSectionMenuOpen((prev) => !prev), setIsSectionOpen((prev) => !prev) }} className="flex w-full items-center gap-2 text-primary-text p-2 text-sm hover:bg-selected">
                  {!tasks?.length ? (
                    <Plus size={17} strokeWidth={2.5} />
                  ) : (
                    <ChevronDown size={17} strokeWidth={2.5} className={`mt-[2px] ${isSectionOpen ? 'rotate-0' : '-rotate-90'} duration-300 transition-transform`} />
                  )}
                  {!tasks?.length ? 'Add Task' : isSectionOpen ? 'Collapse' : 'Open'}
                </button>
              </div>

              <div className="w-full flex flex-col items-start">
                <button onClick={() => { setIsSectionMenuOpen((prev) => !prev), createSection() }} className="w-full flex items-center gap-2 text-primary-text text-sm hover:bg-selected p-2"><CirclePlus size={17} strokeWidth={2} /> Add Section</button>
                <button onClick={() => { setIsSectionMenuOpen((prev) => !prev), deleteSection() }} className="w-full flex items-center gap-2 text-primary-text text-sm hover:bg-selected p-2"><CircleMinus size={17} strokeWidth={2} />Delete Section</button>
              </div>
            </div>
          )}
        </div>

      </div>

      {tasks && isSectionOpen ? (
        <div className="w-[96%] ml-8 border-undertone border-t-2">
          {tasks.map((task) => (
            <ProjectTask key={String(task.id)} taskId={task.id} taskName={task.name || ''} createTask={createTask} focusTask={focusTask} />
          ))}
        </div>
      ) : (
        <div className="w-[96%] ml-8 border-undertone border-t-2"></div>
      )}

      <div className="flex items-center">

        <button onClick={createTask} className={`ml-12 mt-2 text-sm text-secondary-text font-semibold opacity-70 hover:opacity-100 hover:scale-105 transition-transform ${!tasks?.length ? '' : isSectionOpen ? '' : 'hidden'}`}>Add task...</button>

        <div className="mt-2 ml-3">
          <ErrorMessage arrowDirection={'left'} displayError={displayError} exitError={() => exitError(setDisplayError, errorTimeoutRef)} />
        </div>

      </div>
    </div>
  )
}

export default TaskSection