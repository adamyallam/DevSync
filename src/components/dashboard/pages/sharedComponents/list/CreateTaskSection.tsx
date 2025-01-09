'use client'
import { Plus } from "lucide-react"
import TaskSection from "./TaskSection"
import { useParams } from "next/navigation"
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider"
import { TaskSectionSkeletonLoader } from "@/components/styledElements/LoadingElements"
import { useState } from "react"
import { useRef } from "react"
import ErrorMessage from "@/components/styledElements/ErrorMessage"

export const CreateTaskSection = () => {
  const { projects, updateProjectState, loading, showError, exitError } = useProjectsDataContext()
  const { id } = useParams<{ id: string }>()

  const project = projects?.find((project) => project.id.toString() === id);

  const [displayError, setDisplayError] = useState(false)
  const errorTimeoutRef = useRef<number | null>(null);

  if (loading) {
    return <TaskSectionSkeletonLoader />
  }

  if (!project || !project.sections) {
    return <div className='mt-16 ml-8 text-2xl'>Can't retrieve data</div>;
  }

  const createSection = async () => {

    try {
      const res = await fetch("http://localhost:3000/api/section", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectID: project.id })
      });

      if (!res.ok) { throw new Error('Failed to update project') }

      const result = await res.json();

      updateProjectState(project.id, { sections: [...project.sections, result.section] });
      console.log("Section Created:", result.section);
    } catch (error) {
      showError(setDisplayError, errorTimeoutRef)
      console.error("Error creating section:", error);
    }

  };

  return (
    <div className="w-full">
      <div className="w-full">
        {project.sections.map((section) => (
          <TaskSection key={String(section.id)} sectionId={section.id} sectionTitle={section.name || ''} />
        ))}
      </div>

      <div className="flex ml-8 mt-5">
        <button onClick={() => createSection()} className="flex items-center font-semibold text-secondary-text opacity-50 hover:scale-105 hover:opacity-100 transition-transform">
          <Plus size={16} />
          Add Section
        </button>
        <div className="mt-1 ml-4">
          <ErrorMessage arrowDirection={'left'} displayError={displayError} exitError={() => exitError(setDisplayError, errorTimeoutRef)} />
        </div>
      </div>
    </div>
  )
}

export default CreateTaskSection