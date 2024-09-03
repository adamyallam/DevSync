
// Component Imports
import ProjectOverview from "@/components/dashboard/pages/projects/overview/ProjectOverview"
import Transition from "@/components/dashboard/Transition"
import StatusLog from "@/components/dashboard/pages/projects/overview/StatusLog"

export default async function overview() {

  return (
    <div>
      <Transition transition="translate-x-60">
        <ProjectOverview />
      </Transition>

      <StatusLog />
    </div>
  )

}
