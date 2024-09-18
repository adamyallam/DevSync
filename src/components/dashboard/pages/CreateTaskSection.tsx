'use client'
import { Plus } from "lucide-react"
import { useState } from "react"

//component imports
import TaskSection from "./TaskSection"
import MyTask from "./tasks/list/MyTask"

export const CreateTaskSection = () => {
  const [sections, setSections] = useState<JSX.Element[]>([])

  function addSection() {
    const newSection = (() => {
      return <TaskSection key={sections.length} />
    })();

    setSections((prevSections) => {
      return [...prevSections, newSection]
    })
  }

  return (
    <div>
      <div>
        <TaskSection />
        {sections}
      </div>
      <button onClick={() => addSection()} className="flex items-center font-semibold opacity-60 hover:opacity-100 ml-8 mt-5"><Plus size={16}/>Add Section</button>
    </div>
  )
}

export default CreateTaskSection