
// Component Imports
import ProjectOverview from "@/components/dashboard/pages/projects/overview/ProjectOverview"
import Transition from "@/components/dashboard/Transition"
import StatusLog from "@/components/dashboard/pages/projects/overview/StatusLog"

export default async function overview() {

  return (
    <div className="flex flex-grow">
        <div className="flex-grow overflow-y-auto overflow-x-hidden">
          <Transition transition="translate-x-60">
            <ProjectOverview />
          </Transition>
        </div>

        <div>
          <StatusLog />
        </div>
    </div>
  )

}
