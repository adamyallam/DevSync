
// Component Imports
import ProjectOverview from "@/components/dashboard/pages/projects/overview/ProjectOverview"
import Transition from "@/components/dashboard/Transition"
import StatusLog from "@/components/dashboard/pages/projects/overview/StatusLog"

export default async function overview() {

  return (
    <div className="grid grid-cols-4 h-screen overflow-x-hidden">
      <div className="col-span-3 overflow-auto">
        <Transition transition="translate-x-60">
          <ProjectOverview />
        </Transition>
      </div>

      <div className="col-span-1 overflow-auto">
        <StatusLog />
      </div>
    </div>
  )

}
