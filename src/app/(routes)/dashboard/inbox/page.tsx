
//component imports
import { PageTitle } from "@/components/dashboard/PageTitle"
import Transition from "@/components/dashboard/Transition"
import Header from "@/components/dashboard/pages/inbox/Header"


export default async function inbox(){

  return (
    <div>
      <Transition transition="translate-x-60">
        <div className="mt-16">
          <PageTitle />
        </div>
      </Transition>
      <Header />
    </div>
  )

}
