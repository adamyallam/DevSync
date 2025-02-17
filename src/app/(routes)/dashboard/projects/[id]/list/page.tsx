
// Component Imports
import ProjectTasksManager from "@/components/dashboard/pages/projects/list/ProjectTasksManager"
import CreateTaskSection from "@/components/dashboard/pages/sharedComponents/list/CreateTaskSection"

export default async function list() {

  return (
    <div className="flex flex-col h-full w-full">
      <div className="w-full mt-5">
        <ProjectTasksManager />
      </div>
      
      <div className="overflow-x-hidden overflow-y-auto pb-10 h-full"  style={{ scrollbarGutter: 'stable' }}>
        <CreateTaskSection />
      </div>
    </div>
  )

}
