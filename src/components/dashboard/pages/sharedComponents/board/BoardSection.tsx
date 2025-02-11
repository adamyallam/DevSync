'use client'
import { Plus, Ellipsis, CircleMinus, CirclePlus } from "lucide-react"
import { useState, useRef } from "react"
import AutoResizingInput from "@/components/styledElements/AutoResizingInput"
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider"
import { useParams } from "next/navigation"
import useMenuClose from "@/utils/hooks/useMenuClose"
import BoardTask from "./BoardTask"

interface Props {
  sectionTitle: string
  sectionId: number
  createSection: () => void,
  focusSection?: boolean
}

export const BoardSection: React.FC<Props> = ({ sectionTitle, sectionId, createSection, focusSection }) => {
  const { projects, updateSectionDatabase, updateProjectState } = useProjectsDataContext()
  const { id } = useParams<{ id: string }>()

  const project = projects?.find((project) => project.id.toString() === id);
  const section = project?.sections?.find((section) => section.id === sectionId);
  const tasks = project?.tasks?.filter((task) => task.sectionID === sectionId);

  const [focusTask, setFocusTask] = useState<boolean>(false);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const sectionMenuButtonRef = useRef<HTMLButtonElement>(null)

  useMenuClose(menuRef, sectionMenuButtonRef, isSectionMenuOpen, setIsSectionMenuOpen)


  if (!project || !section) {
    return <div className='mt-5 ml-8 text-2xl'>Can&apos;t retrieve data</div>;
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
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className={`flex flex-col mt-5 ml-2 border rounded-lg border-undertone min-w-[270px] h-[calc(100%-40px)]`}>
      <div className="flex justify-between mb-3 border-b border-undertone p-3">
        <AutoResizingInput focusInput={focusSection} initialWidth={115} maxGrowthWidth={1000} initialText={sectionTitle} placeholder="Untitled Section" onConfirmChange={(newName) => updateSectionDatabase(section, project, 'name', newName)} />

        <div className="flex gap-2">
          <button className="text-secondary-text hover:scale-110 hover:text-primary-text transition-transform" onClick={() => createTask()}><Plus size={16} strokeWidth={2} /></button>
          <div className="flex flex-col relative items-center justify-center ">
            <button onClick={() => setIsSectionMenuOpen((prev) => !prev)} ref={sectionMenuButtonRef} className="text-secondary-text hover:scale-110 hover:text-primary-text transition-transform"><Ellipsis size={18} /></button>
            {isSectionMenuOpen && (
              <div ref={menuRef} className="absolute flex flex-col top-full bg-primary border-2 border-undertone rounded-md w-40 z-50">
                <div className="border-b-2 border-undertone w-full">
                  <button onClick={() => { setIsSectionMenuOpen(false), createSection() }} className="w-full flex items-center gap-2 text-primary-text text-sm hover:bg-selected p-2"><CirclePlus size={17} strokeWidth={2} /> Add Section</button>
                </div>

                <div className="w-full flex flex-col items-start">
                  <button onClick={() => { setIsSectionMenuOpen(false), deleteSection() }} className="w-full flex items-center gap-2 text-red-400 text-sm hover:bg-selected p-2"><CircleMinus size={17} strokeWidth={2} />Delete Section</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center h-full overflow-auto">
        {tasks ? (
          <div className="flex flex-col items-center w-[96%]">
            {tasks.map((task) => (
              <BoardTask key={String(task.id)} taskId={task.id} taskName={task.name || ''} createTask={createTask} focusTask={focusTask} />
            ))}
          </div>
        ) : (
          <div className="w-[96%] ml-8 border-undertone border-t-2"></div>
        )}
        <button onClick={() => createTask()} className="flex items-center pb-2 text-secondary-text font-semibold opacity-70 hover:opacity-100 hover:scale-110 text-sm transition-transform">
          <Plus size={14} strokeWidth={3} />
          Add Task
        </button>
      </div>
    </div>
  )
}

export default BoardSection