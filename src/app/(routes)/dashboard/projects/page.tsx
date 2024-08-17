
// Component Imports
import Header from "@/components/dashboard/pages/projects/Header"
import Transition from "@/components/dashboard/Transition"

export default async function project() {

  return (
    <div>
      <Transition transition="translate-x-60">
        <Header />
      </Transition>
    </div>
  )

}
