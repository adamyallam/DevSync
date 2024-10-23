
// Component Imports
import ProjectTasksManager from "@/components/dashboard/pages/projects/list/ProjectTasksManager"
import CreateTaskSection from "@/components/dashboard/pages/sharedComponents/list/CreateTaskSection"

export default async function list() {

  return (
    <div className="flex flex-col h-full w-full">
      <ProjectTasksManager />
      <div className="overflow-x-hidden overflow-y-auto pb-10">
        <CreateTaskSection />
      </div>
    </div>
  )

}
