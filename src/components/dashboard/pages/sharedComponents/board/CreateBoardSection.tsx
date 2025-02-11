'use client'
import { Plus } from "lucide-react"
import { useState, useRef } from "react"
import { BoardSectionSkeleton } from "@/components/styledElements/LoadingElements"
import { useParams } from "next/navigation"
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider"
import BoardSection from "./BoardSection"


export const CreateBoardSection = () => {
  const { projects, updateProjectState, loading } = useProjectsDataContext()
  const { id } = useParams<{ id: string }>()

  const project = projects?.find((project) => project.id.toString() === id);

  const [focusSection, setFocusSection] = useState<boolean>(false);

  if (loading) {
    return (
      <div className="flex h-full">
        <BoardSectionSkeleton />
        <BoardSectionSkeleton />
        <BoardSectionSkeleton />
      </div>
    ) 
  }

  if (!project || !project.sections) {
    return <div className='mt-16 ml-8 text-2xl'>Can&apos;t retrieve data</div>;
  }

  const createSection = async () => {

    try {
      const res = await fetch("/api/section", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectID: project.id })
      });

      if (!res.ok) { throw new Error('Failed to update project') }

      const result = await res.json();

      updateProjectState(project.id, { sections: [...project.sections, result.section] });
      setFocusSection(true);

      console.log("Section Created:", result.section);
    } catch (error) {
      console.error("Error creating section:", error);
    }

  };
  return (
    <div className="flex w-full h-full whitespace-nowrap">
      <div className="flex ml-6">
        {project.sections.map((section) => (
          <BoardSection key={String(section.id)} sectionId={section.id} sectionTitle={section.name || ''} createSection={createSection} focusSection={focusSection} />
        ))}
      </div>

      <div className="pr-[250px]">
        <div onClick={() => createSection()} className="ml-2 mt-5 h-[calc(100%-40px)] min-w-[270px] bg-selected rounded-lg hover:border border-undertone hover:cursor-pointer group">
          <button className="flex items-center justify-center gap-1 pt-3 w-full text-secondary-text text-sm font-semibold opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-transform">
            <Plus size={14} strokeWidth={3} />
            Add Section
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateBoardSection