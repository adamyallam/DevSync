
// Component Imports
import AddTaskButton from "@/components/styledElements/AddTaskButton"
import CreateBoardSection from "@/components/dashboard/pages/sharedTasks/board/CreateBoardSection"

export default async function board() {

  return (
    <div className="flex flex-col w-full h-full">
      <AddTaskButton />
      <div className="overflow-auto w-full h-full bg-gray-50 border-t-2 border-gray-100">
        <CreateBoardSection />
      </div>
    </div>
  )

}
