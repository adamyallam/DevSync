
// Component Imports
import AddTaskButton from "@/components/styledElements/AddTaskButton"
import ProjectBoardTask from "@/components/dashboard/pages/projects/board/ProjectBoardTask"

export default async function board() {

  return (
    <div className="flex flex-col w-full h-full">
      <AddTaskButton />
      <div className="overflow-x-hidden overflow-y-auto w-full h-full bg-gray-50 border-t-2 border-gray-100">
        <ProjectBoardTask />
      </div>
    </div>
  )

}
