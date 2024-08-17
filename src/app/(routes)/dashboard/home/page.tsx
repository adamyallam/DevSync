import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Component Imports
import UserWelcome from "@/components/dashboard/pages/home/UserWelcome";
import Transition from "@/components/dashboard/Transition";
import TasksCard from "@/components/dashboard/pages/home/TasksCard";
import ProjectsCard from "@/components/dashboard/pages/home/ProjectsCard";
import { PageTitle } from "@/components/dashboard/PageTitle";

export default async function home(){
  const session = await getServerSession(authOptions)

  return (
    <div>
      <Transition transition='translate-x-60'>
        <div className="mt-20">
          <PageTitle />
        </div>
      </Transition>
      <Transition transition="translate-x-32">
        <div className="mt-5">
          <UserWelcome name={session?.user.firstName}/>
        </div>
        <div className="flex justify-center gap-4 mt-12">
          <TasksCard />
          <ProjectsCard />
        </div>
      </Transition>
    </div>
  )

}
