'use client'
import { Plus } from "lucide-react"
import { useState } from "react"

//component imports
import TaskSection from "./TaskSection"

export const CreateTaskSection = () => {
  const [sections, setSections] = useState<JSX.Element[]>([])

  function addSection(isFirstSection: boolean = false) {
    const newSection = <TaskSection key={sections.length} isFirstSection={isFirstSection} />

    setSections((prevSections) => {
      return [...prevSections, newSection]
    })
  }

  if (sections.length === 0) {
    addSection(true)
  }

  return (
    <div className="w-full">
      <div className="w-full">
        {sections}
      </div>
      
      <button onClick={() => addSection()} className="flex items-center font-semibold text-secondary-text opacity-50 hover:scale-105 hover:opacity-100 transition-transform ml-8 mt-5">
        <Plus size={16}/>
        Add Section
      </button>
    </div>
  )
}

export default CreateTaskSection