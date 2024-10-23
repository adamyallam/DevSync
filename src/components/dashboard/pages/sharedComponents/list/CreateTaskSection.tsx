'use client'
import { Plus } from "lucide-react"
import { useState, useEffect} from "react"

//component imports
import TaskSection from "./TaskSection"

export const CreateTaskSection = () => {
  const [sections, setSections] = useState<JSX.Element[]>([])
  const [hasInitialTask, setHasInitialTask] = useState<boolean>(true)
  const [isFirstSection, setIsFirstSection] = useState<boolean>(true);

  function addSection() {
    const newSection = <TaskSection key={sections.length + 1} hasInitialTask={hasInitialTask} />

    setSections((prevSections) => {
      return [...prevSections, newSection]
    })
  }

  useEffect(() => {
    setHasInitialTask(sections.length === 0);
  }, [sections]);

  useEffect(() => {
    setIsFirstSection(sections.length === 0)

    if (isFirstSection) {
      addSection()
    }
  }, [isFirstSection])

  return (
    <div>
      <div>
        {sections}
      </div>
      
      <button onClick={() => addSection()} className="flex items-center font-semibold opacity-60 hover:opacity-100 ml-8 mt-5">
        <Plus size={16}/>
        Add Section
      </button>
    </div>
  )
}

export default CreateTaskSection