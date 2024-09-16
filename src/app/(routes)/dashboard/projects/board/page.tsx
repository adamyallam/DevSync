
// Component Imports
import AddTaskButton from "@/components/styledElements/AddTaskButton"

export default async function board() {

  return (
    <div className="flex flex-col w-full h-full">
      <AddTaskButton />
      <div className="overflow-auto bg-gray-100 w-full h-full">

      </div>
    </div>
  )

}
