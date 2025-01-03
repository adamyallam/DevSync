'use client'
import { Plus } from "lucide-react"
import { useState } from "react"
import TaskSection from "./TaskSection"
import { useParams } from "next/navigation"
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider"

export const CreateTaskSection = () => {
  const { projects } = useProjectsDataContext()
  const { id } = useParams<{ id: string }>()

  // const [sections, setSections] = useState<JSX.Element[]>([])

  const project = projects?.find((project) => project.id.toString() === id);

  if (!project || !project.sections) {
    return <div className='mt-16 ml-8 text-2xl'>No sections found</div>;
  }

  // function addSection() {
  //   const newSection = <TaskSection key={sections.length} isFirstSection={sections.length === 0} sectionTitle=""/>

  //   setSections((prevSections) => {
  //     return [...prevSections, newSection]
  //   })
  // }

  // if (sections.length === 0) {
  //   addSection()
  // }

  const createSection = async () => {

    try {
      const res = await fetch("http://localhost:3000/api/section", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId: project.id })
      });

      const result = await res.json();

      if (res.status === 201) {
        // addSection()
        console.log("Section Created:", result.section);
      } else {
        console.log('An error occured, please try again later')
      }
    } catch (error) {
      console.error("Error creating section:", error);
    }

  };

  return (
    <div className="w-full">
      <div className="w-full">
        {project.sections.map((section) => (
          <TaskSection key={section.id} isFirstSection={project.sections.length === 0} sectionTitle={section.name || 'Untitled Sections'}/>
        ))}
      </div>

      <button onClick={() => createSection()} className="flex items-center font-semibold text-secondary-text opacity-50 hover:scale-105 hover:opacity-100 transition-transform ml-8 mt-5">
        <Plus size={16} />
        Add Section
      </button>
    </div>
  )
}

export default CreateTaskSection