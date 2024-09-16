
// Component Imports
import TaskManagement from "@/components/dashboard/pages/projects/list/TaskManagement"
import ProjectTasks from "@/components/dashboard/pages/projects/list/ProjectTasks"

export default async function list() {

  return (
    <div className="flex flex-col h-full w-full">
      <TaskManagement />
      <div className="overflow-x-hidden overflow-y-auto">
        <ProjectTasks />
      </div>
    </div>
  )

}
